# Action JS Template

[![Test](https://github.com/renan-alm/js-action-demo/actions/workflows/2-test-action.yml/badge.svg)](https://github.com/renan-alm/js-action-demo/actions/workflows/2-test-action.yml)
[![License](https://img.shields.io/github/license/renan-alm/js-action-demo)](LICENSE)
[![Issues](https://img.shields.io/github/issues/renan-alm/js-action-demo)](https://github.com/renan-alm/js-action-demo/issues)
[![Stars](https://img.shields.io/github/stars/renan-alm/js-action-demo)](https://github.com/renan-alm/js-action-demo/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/renan-alm/js-action-demo)](https://github.com/renan-alm/js-action-demo/commits/main)

A JavaScript GitHub Action template that provides customizable greeting functionality with environment variable support.

## Features

- Custom greeting with configurable name via inputs or environment variables
- Flexible greeting format with context variable substitution
- Input validation and error handling
- Timestamp output
- Node.js 20 runtime
- Bundled dependencies

## Inputs

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `user-name` | Name to be greeted (when not using env vars) | No | `'Renan'` |
| `use-env-vars` | Whether to use environment variables | No | `'false'` |

## Environment Variables

| Name | Description | Required when use-env-vars is true |
|------|-------------|----------|
| `USER_NAME` | Name to be greeted | Yes |
| `GREETING_FORMAT` | Format string for the greeting | No |

### Greeting Format Variables

The following variables can be used in the `GREETING_FORMAT`:

- `{name}` - The user's name
- `{repo}` - The current repository name
- `{owner}` - The repository owner
- `{date}` - Current date
- `{time}` - Current time

## Outputs

| Name | Description |
|------|-------------|
| `greeting` | The generated greeting message |
| `time` | The timestamp when the action ran |

## Usage

### Basic Usage with Inputs

```yaml
steps:
  - name: Greeting Action
    uses: renan-alm/js-action-demo@v0.5.0
    id: hello
    with:
      user-name: 'Your Name'

  - name: Get Output
    run: |
      echo "Greeting: ${{ steps.hello.outputs.greeting }}"
      echo "Time: ${{ steps.hello.outputs.time }}"
```

### Using Environment Variables

```yaml
steps:
  - name: Greeting Action with Environment Variables
    uses: renan-alm/js-action-demo@v0.5.0
    id: hello
    with:
      use-env-vars: 'true'
    env:
      USER_NAME: 'Your Name'
      GREETING_FORMAT: 'Hi {name}! You are working in {repo} on {date}'

  - name: Get Output
    run: |
      echo "Greeting: ${{ steps.hello.outputs.greeting }}"
      echo "Time: ${{ steps.hello.outputs.time }}"
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Make changes to `src/index.js`
4. Build: `npm run build`
5. Commit including the `dist` folder

## License

MIT License - see LICENSE file for details
