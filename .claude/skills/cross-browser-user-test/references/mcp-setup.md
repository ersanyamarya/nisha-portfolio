# Playwright MCP browser setup

Each Playwright MCP server chooses one browser when it starts. This skill therefore requires three dedicated servers to be running and responsive before an audit begins. A Playwright Test `playwright.config.ts` file does not configure MCP sessions.

Use these exact server names and the same repository-root output directory:

```json
{
  "mcpServers": {
    "playwright-chrome": {
      "command": "playwright-mcp",
      "args": ["--browser", "chrome", "--output-dir", ".playwright-mcp"]
    },
    "playwright-firefox": {
      "command": "playwright-mcp",
      "args": ["--browser", "firefox", "--output-dir", ".playwright-mcp"]
    },
    "playwright-webkit": {
      "command": "playwright-mcp",
      "args": ["--browser", "webkit", "--output-dir", ".playwright-mcp"]
    }
  }
}
```

Install missing Playwright browser binaries from the repository root:

```bash
playwright-mcp install-browser chromium firefox webkit
```

Use the same `playwright-mcp` executable that starts the servers so the installed browser revisions match the MCP package. This command installs all three Playwright engines and skips matching binaries that are already present. It does not install branded Google Chrome: `--browser chrome` still requires Chrome to be installed on the machine. If Chrome itself is missing, install it separately or explicitly choose Playwright Chromium in a supported MCP configuration.

Restart or reload MCP servers after installing browsers or changing their configuration.

WebKit is Safari-oriented compatibility coverage, not the installed Safari application. Report it as “WebKit,” never as confirmed Safari testing.

The skill must verify each server by calling one of its tools and checking runtime browser evidence. Seeing an entry in an MCP configuration file is not proof that the server is running.
