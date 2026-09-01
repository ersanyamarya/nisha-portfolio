# Report shape

The report is the deliverable. Someone should be able to read it and know exactly what is broken, what it costs to fix, and what you deliberately left alone — without re-running anything.

Two rules that matter more than the layout:

- **Every number is measured, never estimated.** If you didn't run it, don't print a ratio for it.
- **Say what you left alone and why.** An audit that only lists problems reads as if it found everything fixable. The exemptions are what show the reader you knew where the line was.

## Template

```markdown
## Theme audit — <project>

Checked <N> token pairs across <themes> statically, and <M> rendered text nodes across <P> pages × <T> themes. <One sentence: overall state.>

### Contrast failures

| Issue                          | Theme   | Before          | After           | Threshold |
| ------------------------------ | ------- | --------------- | --------------- | --------- |
| `--input` — form field borders | both    | 1.36:1 / 1.64:1 | 3.54:1 / 3.61:1 | 3:1       |
| `--destructive` as error text  | both    | 3.65:1          | 6.24:1          | 4.5:1     |
| `text-muted-foreground/70`     | default | 3.17:1          | 7.27:1          | 4.5:1     |

<One or two sentences on the most consequential one — what breaks for a user, not just which rule it violates.>

### Focus indicators

<What the pattern was, what it is now, how many components.>

### Token organization

| Finding                            | Count | Action                                              |
| ---------------------------------- | ----- | --------------------------------------------------- |
| Hardcoded colours bypassing tokens | 41    | 4 should be tokens; rest are brand marks / SVG art  |
| Orphan tokens                      | 7     | 3 are duplicated as literals in `NeonSignature.tsx` |
| Undefined references               | 2     | `--sidebar-width` — resolves to nothing             |
| Theme parity gaps                  | 16    | Reviewed; all deliberate inheritance                |
| Duplicate values                   | 4     | `--primary`/`--ring` intentional                    |

### Deliberately unchanged

- **`--border` at 1.45:1** — decorative card outlines and separators only, never a control boundary, so 1.4.11 doesn't apply. Raising it to 3:1 would put hard lines around every card.
- **404 watermark at 1.27:1** — decorative; the `<h1>` carries the meaning.

### Verification

<How you proved it. Include the negative control.>
```

## On the verification section

State the negative control explicitly. "0 failures" is only meaningful alongside evidence the tooling can produce a non-zero result:

> Final sweep: 8 pages × 2 themes, 1052 text nodes, 0 failures. Validated by re-running against the pre-fix tree (`git stash`), which reports 59 failures across the same pages — so the probe is reaching the content.

Without that second sentence, a clean result is indistinguishable from a probe that silently matched nothing. This is the single most valuable line in the report, and it is the one people leave out.
