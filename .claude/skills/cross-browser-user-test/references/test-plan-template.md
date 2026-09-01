# Cross-Browser User Test Plan

**Application URL:** URL or `Provided at invocation`  
**Objective:** Concise statement of what this plan verifies  
**Execution mode:** Plan plus exploratory audit | Plan only

## Environment matrix

Use `all` to apply the skill defaults or list explicit values.

- **Browsers:** all | Chrome, Firefox, WebKit
- **Viewports:** all | 375×812, 768×1024, 1280×800, 1920×1080
- **Themes/modes:** all | list values | not applicable

## Shared preconditions

- The web server is running and the application URL is reachable.
- Add authentication state, seeded data, feature flags, permissions, or other requirements.

## Test data and safety

- Use non-sensitive test data.
- State whether external submissions or destructive actions are allowed. Default: no.
- Never put passwords, tokens, private personal data, or other secrets in this file.

## Test cases

Duplicate this section for each case. IDs must be unique and stable.

### TP-001 — Descriptive test-case title

- **Priority:** Critical | High | Medium | Low
- **Route:** `/path`
- **Browsers:** all | Chrome, Firefox, WebKit
- **Viewports:** all | list exact dimensions
- **Themes/modes:** all | list values | not applicable
- **Preconditions:** Case-specific setup or `Shared preconditions`
- **Test data:** Non-sensitive values or `None`
- **Destructive/external action:** No | Explicitly approved
- **Evidence:** On failure | Always | None

#### Steps

1. Perform an observable user action.
2. Perform the next action.

#### Expected result

Describe the visible state, navigation, validation message, calculated value, or other observable outcome that determines PASS or FAIL.

## Out of scope

- List intentionally excluded routes, browsers, states, integrations, or actions.

## Overall acceptance criteria

- Every supplied test case passes in every specified environment.
- No mandatory case is BLOCKED or NOT RUN.
- Add product-specific criteria when needed.
