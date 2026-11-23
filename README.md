# Frakment Skills

Provider-neutral Markdown instructions for AI agents using Frakment.

## Available skills

| Skill            | Purpose                                                          |
| :--------------- | :--------------------------------------------------------------- |
| `frakment-usage` | Discover, inspect, and install Frakment web and Expo components. |

Load a skill directly from [the source file](./skills/frakment-usage/SKILL.md).

The Frakment website publishes the same skill at https://www.arrafi.dev/frakment/skills/frakment-usage/SKILL.md.

## Install

Install the public package with `npm install @frakment/skills` or `pnpm add @frakment/skills`.

The skill file is available at `node_modules/@frakment/skills/skills/frakment-usage/SKILL.md`.

## Development

```bash
npm ci
npm pack --dry-run
```

Or use pnpm:

```bash
pnpm install --frozen-lockfile
pnpm pack --dry-run
```

Use Changesets to version changes to skill content.

Published skill files are deployed from [`frakment/ui`](https://github.com/frakment/ui) through its `apps/web/skills-source` submodule, so skill-content changes require a linked UI pull request that updates the submodule pointer.

When a change also alters the site's usage guidance, update the [Skills documentation](https://github.com/frakment/ui/blob/main/apps/web/content/docs/utilities/skills.mdx).

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full contribution workflow, package validation, release guidance, and how to publish skill updates through the UI repository.

## License

The skills are licensed under MIT; see [LICENSE](./LICENSE).
