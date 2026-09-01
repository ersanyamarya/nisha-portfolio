#!/usr/bin/env python3
"""
Design-token hygiene audit — the structural half of a theme review.

Contrast tells you whether the colours are legible. This tells you whether the
token *system* is holding together: values hardcoded around the tokens, tokens
nobody uses, tokens used but never defined, and themes that have quietly
drifted apart.

Deliberately does no colour math. Ratios come from token_matrix.mjs (static)
and probe.js (rendered) — keeping this script structural means it runs on any
stack in under a second with no dependencies.

Usage:
    python3 token_audit.py --css src/styles/global.css --src src
    python3 token_audit.py --css "src/**/*.css" --src src --json
    python3 token_audit.py --css tokens.css --src app --ignore-orphan '--chart-'
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import sys
from collections import defaultdict

# --------------------------------------------------------------------- parsing

DECL_RE = re.compile(r"(--[\w-]+)\s*:\s*([^;{}]+)")
VAR_USE_RE = re.compile(r"var\(\s*(--[\w-]+)")
COMMENT_RE = re.compile(r"/\*.*?\*/", re.S)

# A block declares theme tokens if its selector is a document-level scope:
# `:root`, `:root[data-theme=x]`, `html.dark`, `[data-theme=x]`, `@theme`.
# Component-scoped custom properties (`.card { --gap: 4px }`) are local
# implementation detail, not part of the theme contract, so they stay out.
THEME_SELECTOR_RE = re.compile(
    r"^\s*(?:@theme\b|:root\b|html\b|body\b|\.dark\b|\[data-(?:theme|mode|color-scheme)\b)", re.I
)
# `&` marks a nested rule (`@utility dark { .dark & { --track: … } }`). Those
# custom properties are component-local plumbing, not theme tokens, and letting
# them through invents themes named after utilities.
NESTED_RE = re.compile(r"&")

# Custom properties injected at runtime by a framework rather than authored
# here. Referencing one is normal; it is not a missing definition.
RUNTIME_PREFIXES = ("--tw-", "--radix-", "--reach-", "--chakra-", "--mantine-", "--shiki-")
# Tailwind ships `--color-<hue>-<step>` and `--spacing-*` etc. in its own
# @theme, so a reference to one resolves even though this project never
# declares it.
FRAMEWORK_SCALE_RE = re.compile(
    r"^--(?:color|spacing|text|font|radius|shadow|breakpoint|container|leading|tracking|ease|animate|blur|perspective|aspect)-"
    r"[a-z]+(?:-\d{1,3})?$"
)

SOURCE_EXTS = (".tsx", ".ts", ".jsx", ".js", ".vue", ".svelte", ".astro", ".css", ".scss", ".mdx", ".html")

# Colour literals that bypass the token layer. Deliberately excludes `#` inside
# URLs/ids and the 0-alpha shadows people legitimately hand-write.
HEX_RE = re.compile(r"(?<![\w&#])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b")
FN_COLOR_RE = re.compile(r"\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(\s*[\d.][^)]*\)", re.I)

# Tailwind palette utilities — a token system's most common leak.
TW_PALETTE = (
    "slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|"
    "teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"
)
TW_CLASS_RE = re.compile(
    rf"\b(?:text|bg|border|ring|fill|stroke|from|via|to|decoration|outline|shadow|accent|caret|divide|placeholder)"
    rf"-(?:{TW_PALETTE})-(?:50|\d{{3}})\b"
)

# `text-muted-foreground/70` — a token weakened at the call site.
# Only text-bearing utilities are scanned. `bg-primary/10` and `border-x/20`
# are ordinary tinting and surface almost every file in a codebase; folding
# them in buries the handful of usages that genuinely dim readable text.
DILUTED_RE = re.compile(
    r"\b(?:text|placeholder|decoration)-([a-z][\w-]*?)/(\d{1,3})\b"
)


def read(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        return fh.read()


def expand(patterns: list[str]) -> list[str]:
    out: list[str] = []
    for p in patterns:
        hits = glob.glob(p, recursive=True)
        out.extend(h for h in hits if os.path.isfile(h))
        if not hits and os.path.isfile(p):
            out.append(p)
    return sorted(set(out))


def walk_sources(roots: list[str]) -> list[str]:
    files: list[str] = []
    for root in roots:
        if os.path.isfile(root):
            files.append(root)
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [
                d for d in dirnames
                if d not in {"node_modules", ".git", ".cache", "public", "dist", "build", ".next", "coverage"}
            ]
            files.extend(
                os.path.join(dirpath, f) for f in filenames if f.endswith(SOURCE_EXTS)
            )
    return sorted(set(files))


def iter_blocks(css: str):
    """
    Yield (selector, own_declaration_text) for every brace block, tracking
    nesting so a nested `.dark &{...}` inside `@utility{...}` doesn't get its
    parent's declarations attributed to it — and, more importantly, so the
    parent's declaration text never gets mistaken for a selector. A naive
    a naive `selector {decls}` regex gets this wrong on any modern stylesheet
    and silently invents themes named after CSS declarations.
    """
    stack: list[tuple[str, int]] = []
    seg_start = 0
    i = 0
    n = len(css)
    while i < n:
        c = css[i]
        if c == "{":
            raw = css[seg_start:i]
            # The selector is whatever follows the last block or statement
            # boundary in this segment.
            for sep in ("}", ";"):
                if sep in raw:
                    raw = raw.rsplit(sep, 1)[1]
            stack.append((" ".join(raw.split()), i + 1))
            seg_start = i + 1
        elif c == "}":
            if stack:
                selector, body_start = stack.pop()
                yield selector, css[body_start:i]
            seg_start = i + 1
        i += 1


def own_declarations(body: str) -> str:
    """Strip nested blocks so only this block's own declarations remain."""
    out, depth = [], 0
    for ch in body:
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth = max(0, depth - 1)
        elif depth == 0:
            out.append(ch)
    return "".join(out)


def parse_css(css_files: list[str]):
    """
    Return (themes, alias_block, definition_sites, locally_declared).

    `themes` holds only document-scoped theme tokens — the palette contract.
    `locally_declared` holds every custom property declared anywhere, including
    component-scoped ones like `@utility slider { --track: … }`. The split
    matters: a component-local property is not part of the theme, but it *is*
    defined, so referencing it must not be reported as a dangling reference.
    """
    themes: dict[str, dict[str, str]] = defaultdict(dict)
    aliases: dict[str, str] = {}
    sites: dict[str, list[str]] = defaultdict(list)
    local: set[str] = set()

    for path in css_files:
        source = read(path)
        css = COMMENT_RE.sub("", source)
        lines = source.splitlines()
        for selector, body in iter_blocks(css):
            decls_text = own_declarations(body)
            if "--" not in decls_text:
                continue
            local |= {d.group(1) for d in DECL_RE.finditer(decls_text)}
            if not THEME_SELECTOR_RE.match(selector):
                continue
            if NESTED_RE.search(selector):
                continue
            found = {d.group(1): d.group(2).strip() for d in DECL_RE.finditer(decls_text)}
            if not found:
                # `--` appeared only inside a value (e.g. a transition-property
                # list). Registering the selector here would invent a theme.
                continue
            target = aliases if selector.startswith("@theme") else themes[selector]
            for name, value in found.items():
                target[name] = value
                if name not in sites:
                    for i, line in enumerate(lines, 1):
                        if re.search(rf"{re.escape(name)}\s*:", line):
                            sites[name].append(f"{path}:{i}")
                            break
    return dict(themes), aliases, dict(sites), local


# -------------------------------------------------------------------- findings


def audit(css_files: list[str], src_roots: list[str], ignore_orphan: list[str]):
    themes, aliases, sites, locally_declared = parse_css(css_files)
    if not themes:
        return {"error": "No theme blocks found. Point --css at the file declaring :root / [data-theme] custom properties."}

    root_key = next((k for k in themes if k.startswith(":root") and "[" not in k), None)
    root = themes.get(root_key, {}) if root_key else {}
    overrides = {k: v for k, v in themes.items() if k != root_key}

    defined = set(root) | {n for d in overrides.values() for n in d}

    # --- how each token is referenced ------------------------------------
    used_in_css: set[str] = set()
    for path in css_files:
        used_in_css |= set(VAR_USE_RE.findall(read(path)))
    for v in list(root.values()) + [x for d in overrides.values() for x in d.values()] + list(aliases.values()):
        used_in_css |= set(VAR_USE_RE.findall(v))

    src_files = walk_sources(src_roots)
    # The stylesheets that *declare* the tokens are where literal colours are
    # supposed to live. Scanning them for "hardcoded colours" reports the
    # palette itself as a defect.
    token_files = {os.path.realpath(p) for p in css_files}
    used_in_src: set[str] = set()
    hardcoded: list[dict] = []
    tw_leaks: list[dict] = []
    diluted: list[dict] = []

    # Tailwind exposes `--color-x` as the utility suffix `x`; track both spellings.
    alias_suffixes = {n[len("--color-"):]: n for n in aliases if n.startswith("--color-")}
    for n in defined:
        alias_suffixes.setdefault(n.lstrip("-"), n)

    for path in src_files:
        text = read(path)
        used_in_src |= set(VAR_USE_RE.findall(text))
        declares_tokens = os.path.realpath(path) in token_files
        for i, line in enumerate(text.splitlines(), 1):
            stripped = line.strip()
            if stripped.startswith(("//", "*", "/*")):
                continue
            if not declares_tokens:
                for m in HEX_RE.finditer(line):
                    hardcoded.append({"file": path, "line": i, "value": m.group(0), "kind": "hex"})
                for m in FN_COLOR_RE.finditer(line):
                    hardcoded.append({"file": path, "line": i, "value": m.group(0), "kind": "fn"})
            for m in TW_CLASS_RE.finditer(line):
                tw_leaks.append({"file": path, "line": i, "value": m.group(0)})
            for m in DILUTED_RE.finditer(line):
                suffix, pct = m.group(1), int(m.group(2))
                if suffix in alias_suffixes and pct < 100:
                    diluted.append({
                        "file": path, "line": i, "utility": m.group(0),
                        "token": alias_suffixes[suffix], "alpha": pct / 100,
                    })

    # Utility classes also consume tokens without ever writing `var(--x)`.
    used_via_utility: set[str] = set()
    utility_re = re.compile(
        r"\b(?:text|bg|border|ring|fill|stroke|from|via|to|decoration|outline|shadow|accent|caret|divide|placeholder)"
        r"-([a-z][\w-]*)\b"
    )
    for path in src_files:
        for m in utility_re.finditer(read(path)):
            tok = alias_suffixes.get(m.group(1))
            if tok:
                used_via_utility.add(tok)
                if tok.startswith("--color-"):
                    used_via_utility.add("--" + m.group(1))

    used = used_in_css | used_in_src | used_via_utility

    def ignored(name: str) -> bool:
        return any(pat in name for pat in ignore_orphan)

    orphans = sorted(
        n for n in defined
        if n not in used and f"--color-{n.lstrip('-')}" not in aliases and not ignored(n)
    )
    undefined = sorted(
        n for n in (used_in_css | used_in_src)
        if n not in defined
        and n not in aliases
        and n not in locally_declared
        and not n.startswith(RUNTIME_PREFIXES)
        and not FRAMEWORK_SCALE_RE.match(n)
    )

    # --- theme parity -----------------------------------------------------
    # A token the base theme defines and an override doesn't simply inherits.
    # That is often correct (shared radii, shared chart hues) and often a bug
    # (a dark-mode palette that forgot its destructive red). Only colour-valued
    # tokens are worth flagging; geometry and timing legitimately carry over.
    COLORISH = re.compile(r"#|rgb|hsl|oklch|oklab|\bcolor\b")
    parity = []
    for sel, decls in overrides.items():
        missing = sorted(
            n for n, v in root.items()
            if n not in decls and COLORISH.search(v) and not ignored(n)
        )
        if missing:
            parity.append({"theme": sel, "inherits_from_root": missing})

    # --- duplicate values -------------------------------------------------
    by_value: dict[str, list[str]] = defaultdict(list)
    for n, v in root.items():
        if COLORISH.search(v) and not v.startswith("var("):
            by_value[" ".join(v.split()).lower()].append(n)
    duplicates = [
        {"value": v, "tokens": sorted(ns)} for v, ns in sorted(by_value.items()) if len(ns) > 1
    ]

    # --- wiring gaps (Tailwind v4 @theme) ---------------------------------
    unwired = []
    if aliases:
        aliased_targets = {
            m.group(1) for v in aliases.values() for m in [VAR_USE_RE.search(v)] if m
        }
        unwired = sorted(
            n for n in root
            if n not in aliased_targets and COLORISH.search(root[n]) and not ignored(n)
        )

    return {
        "summary": {
            "themes": [root_key] + sorted(overrides),
            "tokens_defined": len(defined),
            "orphans": len(orphans),
            "undefined_references": len(undefined),
            "hardcoded_colors": len(hardcoded),
            "tailwind_palette_leaks": len(tw_leaks),
            "diluted_token_usages": len(diluted),
            "duplicate_values": len(duplicates),
            "unwired_tokens": len(unwired),
            "source_files_scanned": len(src_files),
        },
        "orphans": orphans,
        "undefined_references": undefined,
        "theme_parity": parity,
        "duplicate_values": duplicates,
        "unwired_tokens": unwired,
        "hardcoded_colors": hardcoded,
        "tailwind_palette_leaks": tw_leaks,
        "diluted_token_usages": diluted,
        "definition_sites": sites,
    }


# ----------------------------------------------------------------- presentation


def group(rows, key="file"):
    out = defaultdict(list)
    for r in rows:
        out[r[key]].append(r)
    return out


def render(rep: dict) -> str:
    if "error" in rep:
        return f"ERROR: {rep['error']}"
    s, L = rep["summary"], []
    L.append("=" * 68)
    L.append("DESIGN TOKEN HYGIENE")
    L.append("=" * 68)
    L.append(f"themes:  {', '.join(s['themes'])}")
    L.append(f"tokens:  {s['tokens_defined']} defined   |   source files scanned: {s['source_files_scanned']}")
    L.append("")

    def section(title, body, note=None):
        if not body:
            return
        L.append(f"--- {title} " + "-" * max(0, 63 - len(title)))
        if note:
            L.append(f"    {note}")
        L.extend(body)
        L.append("")

    section(
        f"UNDEFINED REFERENCES ({len(rep['undefined_references'])})",
        [f"    {n}" for n in rep["undefined_references"]],
        "Referenced but never declared — these resolve to nothing at runtime.",
    )
    section(
        f"UNWIRED TOKENS ({len(rep['unwired_tokens'])})",
        [f"    {n}" for n in rep["unwired_tokens"]],
        "Declared but absent from @theme, so no utility class can reach them.",
    )
    section(
        f"ORPHANS ({len(rep['orphans'])})",
        [f"    {n}" for n in rep["orphans"]],
        "Defined but never consumed. Confirm before deleting — dynamic class\n"
        "    names and third-party CSS can consume a token invisibly.",
    )
    section(
        f"THEME PARITY ({sum(len(p['inherits_from_root']) for p in rep['theme_parity'])})",
        [
            f"    {p['theme']}\n" + "\n".join(f"        {n}" for n in p["inherits_from_root"])
            for p in rep["theme_parity"]
        ],
        "Colour tokens the override doesn't redeclare, so they inherit :root.\n"
        "    Often deliberate; occasionally a palette that forgot a colour.",
    )
    section(
        f"DUPLICATE VALUES ({len(rep['duplicate_values'])})",
        [f"    {d['value']:<28} {', '.join(d['tokens'])}" for d in rep["duplicate_values"]],
        "Identical values under different names — either a missing alias or a\n"
        "    coincidence that will drift apart on the next palette change.",
    )

    tw = group(rep["tailwind_palette_leaks"])
    section(
        f"TAILWIND PALETTE LEAKS ({len(rep['tailwind_palette_leaks'])})",
        [f"    {f}\n" + "\n".join(f"        :{r['line']:<5} {r['value']}" for r in rows) for f, rows in sorted(tw.items())],
        "Raw palette utilities bypass the token layer and won't follow a theme.",
    )

    hc = group(rep["hardcoded_colors"])
    section(
        f"HARDCODED COLORS ({len(rep['hardcoded_colors'])})",
        [f"    {f}\n" + "\n".join(f"        :{r['line']:<5} {r['value']}" for r in rows) for f, rows in sorted(hc.items())],
        "Literal colours in source. Some are legitimate (shadows, SVG art);\n"
        "    the ones to fix are those that should have followed a token.",
    )

    dl = group(rep["diluted_token_usages"])
    section(
        f"DILUTED TEXT TOKENS ({len(rep['diluted_token_usages'])})",
        [
            f"    {f}\n" + "\n".join(f"        :{r['line']:<5} {r['utility']:<34} → {r['token']} @ {r['alpha']:.0%}" for r in rows)
            for f, rows in sorted(dl.items())
        ],
        "Text colour weakened at the call site, landing at a ratio the token\n"
        "    matrix never checks. These are the single most common source of real\n"
        "    contrast failures — confirm every one in the rendered sweep.",
    )

    if not any(
        rep[k] for k in
        ("orphans", "undefined_references", "theme_parity", "duplicate_values",
         "unwired_tokens", "hardcoded_colors", "tailwind_palette_leaks", "diluted_token_usages")
    ):
        L.append("No hygiene findings.")
    return "\n".join(L)


def main() -> int:
    ap = argparse.ArgumentParser(description="Audit design-token organization.")
    ap.add_argument("--css", nargs="+", required=True, help="Stylesheet(s) declaring the tokens (globs ok).")
    ap.add_argument("--src", nargs="+", default=["src"], help="Source root(s) to scan for token usage.")
    ap.add_argument("--ignore-orphan", nargs="*", default=[], help="Substrings of token names to exempt.")
    ap.add_argument("--json", action="store_true", help="Emit the raw report as JSON.")
    args = ap.parse_args()

    css = expand(args.css)
    if not css:
        print(f"No stylesheet matched {args.css}", file=sys.stderr)
        return 2

    rep = audit(css, args.src, args.ignore_orphan)
    print(json.dumps(rep, indent=2) if args.json else render(rep))
    return 1 if rep.get("summary", {}).get("undefined_references") else 0


if __name__ == "__main__":
    sys.exit(main())
