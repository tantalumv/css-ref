# Datastar Lint Test Fixtures

This directory contains HTML fixtures for testing Datastar lint rules.

## Files

### `valid-datastar.html`
**Purpose**: Demonstrates correct Datastar patterns that should pass all lint rules.

**Key patterns shown**:
- Proper `data-signals` initialization on body
- Correct `$` prefix for all signal references
- Window-exposed functions only (`renderGrid`, `filtered`, etc.)
- Valid `data-on:*` and `data-on:*__*` attribute usage
- Proper `data-on:click__outside` placement on popover container
- Single global escape handler
- Event delegation pattern for chips
- Pure computations in `data-text`

### `invalid-datastar.html`
**Purpose**: Demonstrates INCORRECT patterns that should fail specific lint rules.

**Violations by rule**:

| Rule | Violation Example |
|------|-------------------|
| `ds/no-unknown-directives` | `data-model`, `data-if`, `data-loop` |
| `ds/no-lexical-references` | `toggleCat(cat)` where `cat` is undefined |
| `ds/signal-prefix` | `viewMode` instead of `$viewMode` |
| `ds/no-document-or-import` | `document.querySelector(...)` in expression |
| `ds/expression-length` | Expression > 160 characters |
| `ds/no-side-effects-in-data-text` | `($query = '', 'Cleared')` |
| `ds/window-exposure` | `privateHelper()` not on window |
| `ds/click-outside-target` | `data-on:click__outside` on child button |
| `ds/event-escape-unique` | Multiple `data-on:keydown__window` handlers |
| `ds/bubbling-threshold` | 6+ identical `toggleCat('...')` handlers |
| `ds/forbidden-attrs-in-expr` | `fetch()` in `data-init` |
| `ds/no-inline-html-injections` | `innerHTML = $userInput` |
| `ds/signals-json-valid` | Invalid JSON in `data-signals` (commented) |

### `borderline-datastar.html`
**Purpose**: Shows edge cases that may trigger warnings depending on configuration.

**Borderline patterns**:
- Expressions approaching max length (160 chars)
- Multiple statements in event handlers
- Complex ternary operators
- Explicit `window.*` vs implicit function calls
- Multiple event modifiers (`__stop__prevent`)
- Custom debounce timing

## Usage

### With oxlint

```bash
# Check valid file (should pass)
oxlint --config .oxlintrc.json e2e/fixtures/lint/valid-datastar.html

# Check invalid file (should fail with errors)
oxlint --config .oxlintrc.json e2e/fixtures/lint/invalid-datastar.html

# Check borderline file (may show warnings)
oxlint --config .oxlintrc.json e2e/fixtures/lint/borderline-datastar.html
```

### In CI

Add to your CI pipeline to ensure fixtures stay valid:

```yaml
- name: Lint Datastar Fixtures
  run: |
    oxlint --config .oxlintrc.json e2e/fixtures/lint/valid-datastar.html
    # Expect invalid-datastar.html to fail (test the linter)
    oxlint --config .oxlintrc.json e2e/fixtures/lint/invalid-datastar.html || true
```

## Adding New Fixtures

When adding new test cases:

1. Create a new `.html` file in this directory
2. Add a comment header explaining what it tests
3. Document expected lint results (pass/fail/warn)
4. Update this README with the new fixture

## Rule Configuration

See `.oxlintrc.json` in project root for rule settings:

```json
{
  "settings": {
    "datastar": {
      "maxExpressionLength": 160,
      "bubblingThreshold": 5,
      "manifestPath": "./datastar-manifest.json"
    }
  }
}
```

## Related Files

- `/.oxlintrc.json` - Main lint configuration
- `/datastar-manifest.json` - Window exports manifest
- `/scripts/generate-manifest.ts` - Manifest generator script
