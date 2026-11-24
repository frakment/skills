# Contributing to Frakment Skills

Thanks for contributing to the provider-neutral Frakment skills.

## How the repositories fit together

This repository contains the source Markdown files published in the `@frakment/skills` package.

The deployed website consumes published skill files through the `apps/web/skills-source` submodule in [`frakment/ui`](https://github.com/frakment/ui).

When published skill content changes, update the submodule pointer in a linked UI contribution so the deployed site uses the new source.

When a change also affects the usage guidance shown on the site, update the [Skills documentation](https://github.com/frakment/ui/blob/main/apps/web/content/docs/utilities/skills.mdx) in that UI contribution.

## Development and validation

Edit the source files under `skills/` and keep the instructions accurate for Frakment features that ship today.

Validate the package with npm:

```bash
npm ci
npm pack --dry-run
```

Or use pnpm:

```bash
pnpm install --frozen-lockfile
pnpm pack --dry-run
```

Use Changesets for published skill content changes.

Create a changeset with `npm run changeset` or `pnpm changeset`.

## Contributions

All changes to `main` must be submitted through a pull request, including changes from Developers and Maintainers.

The owner reviews every pull request and is the only person who merges to `main`.

Maintainers and Developers may help review, but only the owner merges changes to the protected default branch.

See the [Frakment contributor governance guide](https://github.com/frakment/.github/blob/main/GOVERNANCE.md) for contributor levels, promotion, and repository access.

Link the UI documentation or submodule update pull request to the Skills source pull request so both changes can be reviewed and released together.
