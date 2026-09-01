# Cross-Browser User Test Report

**Date:** YYYY-MM-DD  
**Application URL:** URL  
**Result:** PASS | FAIL | PARTIALLY BLOCKED | BLOCKED

## Scope and limitations

- Browsers: Chrome/Chromium version, Firefox version, WebKit version
- WebKit provides Safari-oriented coverage; installed Safari was not tested.
- Viewports: list exact dimensions
- Themes/modes: list tested values
- Routes: all discovered routes | named routes | sampled routes
- Test plan: path, attachment name, inline plan, or `None — exploratory audit`
- Limitations: none | concise explanation

## Summary

| Status  | Count |
| ------- | ----: |
| PASS    |     0 |
| FAIL    |     0 |
| BLOCKED |     0 |
| NOT RUN |     0 |

## Coverage matrix

| Browser | Viewport | Theme/mode | Routes | Result |
| ------- | -------- | ---------- | -----: | ------ |
| Chrome  | 375×812  | Example    |      0 | PASS   |

## Planned test results

Include one row per test-case/environment combination. Omit this section only when no test plan was supplied.

| Test ID | Test case | Browser | Viewport | Theme/mode | Status | Evidence                                        |
| ------- | --------- | ------- | -------- | ---------- | ------ | ----------------------------------------------- |
| TP-001  | Example   | Chrome  | 375×812  | Example    | PASS   | `[view](screenshots/chrome/mobile/example.png)` |

## Routes and interactions tested

- `/` — navigation, theme toggle
- `/example` — form validation, calculation, reset

## Findings

### 1. Concise finding title

- **Severity:** Critical | High | Medium | Low
- **Status:** FAIL | BLOCKED
- **Environment:** Browser, viewport, theme/mode
- **Route:** `/path`
- **Steps:** Numbered reproduction steps
- **Expected:** Expected user-visible behavior
- **Actual:** Observed behavior
- **Evidence:** `![Description](screenshots/browser/viewport/file.png)`
- **Console/runtime evidence:** Relevant message or “None”

If there are no findings, state: “No reproducible user-facing defects were found in the tested matrix.”

## Passed checks

- Concise groups of verified behavior; do not list vague claims.

## Blocked or untested

- Combination or flow — reason and what is needed to test it.

## Evidence index

| Screenshot                                      | Browser | Viewport     | Route   | Purpose                        |
| ----------------------------------------------- | ------- | ------------ | ------- | ------------------------------ |
| `[file](screenshots/browser/viewport/file.png)` | Browser | Width×height | `/path` | Failure or representative pass |
