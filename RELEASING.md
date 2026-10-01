# Releasing heyo-ui

`@heyo-sh/heyo-ui` is versioned with
[Changesets](https://github.com/changesets/changesets) and published only by
GitHub Actions.

## One-time repository setup

1. In npm, verify that the account creating the token is a member of the
   `@heyo-sh` organization and can publish organization packages. Do not create
   the package in npm's UI: the first approved release creates
   `@heyo-sh/heyo-ui` automatically.
2. For the first publish only, create an npm automation or granular token with
   publish access to that package (or to the `@heyo-sh` scope).
3. In GitHub, create an environment named `npm`, restrict it to `main`, and add
   the required reviewers you want for a production release.
4. Add the token as the `NPM_TOKEN` secret in that `npm` environment. Do not add
   it as a repository-wide secret.
5. In npm, enable 2FA for the owning account or organization and grant only the
   required maintainers publish access.
6. In GitHub Actions settings, allow the workflow `GITHUB_TOKEN` to create pull
   requests and write repository contents.
7. After the package exists on npm, configure its **Trusted Publisher** for the
   `heyo-sh/heyo-ui` repository, the `release.yml` workflow, and the `npm`
   environment. Then remove `NPM_TOKEN`. The workflow has the required OIDC
   permission and npm will use short-lived credentials automatically.

## Normal release flow

1. For every user-facing change, run `bun run changeset`, choose the smallest
   correct semver bump, and commit the generated file.
2. Merge the pull request into `main`.
3. The **Release** workflow opens or updates a version pull request.
4. Review and merge that pull request. The workflow then asks for approval of
   the `npm` environment and publishes the new version.

The first run on `main` can publish the existing package version directly when
the npm package does not yet exist. Inspect the package contents with
`bun pm pack --dry-run` and approve the protected `npm` environment only after
that review.

## What a release must contain

`bun run quality` runs in CI before anything is published, and `verify` is the
check that matters most here: it packs the real tarball, installs it into a
throwaway project, and proves that a consumer's one-line setup still works.
A broken `exports` map, a missing `@source` directive, or an entry point that
was exported from `src/index.ts` but never added to `build:js` all pass a
typecheck and fail here.

Never publish from a local machine. Use `bun pm pack --dry-run` locally to
inspect the files a future release would contain.
