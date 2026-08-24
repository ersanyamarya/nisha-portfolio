# Pulling a case study out of claude.ai/design

The user's case studies live as `.dc.html` files inside a claude.ai/design canvas project (the `claude_design` MCP, exposed here as the `DesignSync` tool). Each case study is one `.dc.html` file plus a set of imported assets (screenshots, diagrams) under `assets/`, and every project shares a `support.js` runtime file that makes the `.dc.html` format work as a live page in the design tool. **You are not shipping that runtime** — you're reading the case study's *content* out of it and rebuilding it as a normal React page. Never import `support.js` or the `dc-runtime` into the site.

## 1. Find the project and the file

The user will usually hand you a URL like:

```
https://claude.ai/design/p/<projectId>/case-study-<slug>.dc.html?file=case-study-<slug>.dc.html
```

The `<projectId>` (the segment after `/p/`) is what `DesignSync` needs — pass it as `projectId` to every call, not the file-scoped URL.

```
DesignSync.get_project({ projectId })       # sanity check: confirms you can read it, returns its name
DesignSync.list_files({ projectId })        # full file tree — case studies, assets/, uploads/, support.js
DesignSync.get_file({ projectId, path })    # read one file
```

`get_project` works even for a plain "Project" type (not just the design-system projects `list_projects` enumerates on its own) — always call it directly with the projectId from the URL rather than assuming the project must appear in `list_projects` first.

Read the target `case-study-*.dc.html` file plus every asset path it references (`<img src="assets/...">`) — `list_files` shows you the full asset list, but only fetch the ones the specific case study you're importing actually uses, not every asset in the project.

## 2. The 256 KiB read cap — and why it matters here

`get_file` truncates any file over 256 KiB. For the `.dc.html` file itself this just means you'll need multiple reads (see below) — annoying but harmless, since HTML is text and you can page through it. **For binary image assets, a truncation is not harmless — it's silent corruption.** A truncated PNG/JPEG still often *has* a valid-looking magic-byte header (because that's the first thing in the file), so it's easy to mistake a corrupted 192 KB decode for a legitimate small image. It is not: the IDAT/entropy-coded stream got cut off mid-stream, and decoding it further will produce garbage or a decoder error.

**Detect this before writing anything to disk:**

```python
import json, base64
data = json.loads(persisted_output)   # whatever get_file returned
if data.get("truncated"):
    # DO NOT decode-and-save this as if it were the real image.
    ...
```

A giveaway even without checking the `truncated` flag: if the decoded byte length is *exactly* `256 * 1024 * 3 // 4 = 196608` bytes, that's the base64 cap manifesting as a suspiciously round binary size — treat it as truncated.

For every truncated asset:

1. Note its **exact** declared filename and extension from the `.dc.html` source (e.g. `assets/flexera-current-experience-audit.png`) — this is the contract the code will reference.
2. Generate a placeholder at that exact path with `scripts/make_placeholder.py <path>` (see that script's docstring — it also fixes up JPEG vs PNG byte-content to match the declared extension, so production `Content-Type` headers stay correct).
3. Tell the user which images are placeholders and why, once, in a single summary — don't ask them file-by-file. See "Talking to the user about placeholders" below.

Assets *under* the cap decode fine — but double-check the real magic bytes against the declared extension anyway (`file <path>` or a Python header sniff): the design tool sometimes uploads a PNG under a `.jpg` name or vice versa. When they mismatch, keep the *content's* real format and rename the file to match — don't force a PNG to lie inside a `.jpg` file, because that's the exact Content-Type problem `make_placeholder.py` deliberately avoids for the placeholders.

### Talking to the user about placeholders

Don't silently ship placeholders and move on, and don't stop and ask permission for every single image either — both waste the user's time. Once you know the full list of truncated assets for this case study, ask once, up front, in a single question, something like:

> "N of the M screenshots in this case study are too large for the import tool (256KB cap) — [list them]. I'll name-match placeholders for them so the page ships today; drop the real files in at [paths] whenever you have them, no code changes needed. Sound good, or do you want to handle these differently?"

If the user has strong opinions (e.g. "just skip those sections entirely" or "let me export smaller versions first"), follow their call instead of defaulting to placeholders.

## 3. Reading a large `.dc.html` file in full

The `.dc.html` content itself frequently exceeds the tool-result preview/paging limits even when `get_file` didn't truncate it (that's a display truncation, not a data truncation — check the `truncated` field in the JSON to tell them apart). When the preview says "showing the first N of M characters":

- The full content is saved to a local file (the tool result mentions the path) — read the remainder with `tail -c` / `dd` rather than the `Read` tool's line-based offset, since these files are one giant JSON line.
- Cross-check `wc -c` against how much you've read so you know when you have the whole thing.

## 4. What's actually in a `.dc.html` file

Structure, top to bottom:

- `<helmet>` — font links, a `<style>` block (the design tool's own CSS reset — ignore it, the site has its own), and a mermaid.js CDN script tag (also ignore — see the diagram-design reference for what to do with any mermaid diagrams instead).
- The visible content — semantic HTML sections with heavy inline `style="..."` attributes, using the design tool's own ad-hoc color values (arbitrary hex/oklch, not the site's tokens).
- `<sc-for>` / `{{ }}` template bindings and a trailing `<script type="text/x-dc" data-dc-script">` class — this is the design tool's own tiny reactive runtime (scroll-spy nav, mermaid re-render on mutation). None of this ships; the site already has (or this skill builds) equivalent React behavior (see `references/case-study-conventions.md`).

Read it as a content outline, not markup to preserve: headings, stat callouts, quotes, bulleted findings, image placements with alt text, and any flowchart/journey content (flag these for the diagram-design pass, don't just paraphrase them into a paragraph).
