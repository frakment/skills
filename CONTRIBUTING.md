# Contributing to Frakment Skills

Thanks for contributing to the provider-neutral Frakment skills.

## Contributor levels

Contributor levels describe the kinds of contributions and responsibilities someone has taken on.

The descriptions below are guidance, not a checklist, minimum contribution count, required tenure, or promise of promotion.

### Public Contributor

Anyone who participates through issues, discussions, documentation, testing, or pull requests is a Public Contributor.

Public Contributors can submit pull requests from forks without organization membership or repository access.

### Regular Contributor

Regular Contributors have made constructive contributions that help Frakment and collaborate well with reviewers and other contributors.

Contributions can include code, tests, documentation, issue reports, triage, or other useful project work.

### Developer

Developers are trusted contributors who can make and explain technical changes independently while following project conventions and responding constructively to review.

Developers remain responsible for submitting their changes through pull requests.

### Maintainer

Maintainers help steward Frakment by reviewing contributions, supporting contributors, triaging issues, and caring for parts of the project.

Maintainers also submit their own changes through pull requests.

## Recognition and promotion

Contributors may ask to be considered for another level.

Advancement is based on the contributor's work, collaboration, judgment, and willingness to take on the responsibilities of the next level.

There is no required amount of time, fixed number of pull requests, or automatic promotion.

Examples of expected contributions are considered in context and are not absolute eligibility requirements.

Contributor levels do not automatically grant organization membership, repository access, review permissions, or merge privileges.

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

See the [Frakment contributor governance guide](https://github.com/frakment/.github/blob/main/GOVERNANCE.md) for organization teams and repository access details.

Link the UI documentation or submodule update pull request to the Skills source pull request so both changes can be reviewed and released together.
