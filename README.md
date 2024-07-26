# NEAR/Pagoda UI

A React component library that implements the official design system of NEAR and Pagoda. Feel free to open up new issues for any bugs that you run into or any features/components you'd like to see implemented.

*NOTE: As of now, this library has a peer dependency on Next JS since some of our components rely on `next/link` and hooks like `router.push()`. We'll look into refactoring the library soon to remove the Next JS requirement so that our library can be used within any React framework.*

## Installation

TODO...

## Documentation

TODO...

## Contributing

TODO...

## Local Development

TODO... Walk through steps using `pnpm link` to test or see local changes within any project.

## Publishing a Release

- Merge all desired changes into `main` via pull requests.
- Determine the version number for the new release.
- Push updated `version` field in `package.json` to `main`.
- Create a new release via GitHub: https://github.com/near/pagoda-ui/releases/new
- Use updated `version` value as the new `tag` and `Release title` value and use `main` as the target branch.
- Click the publish button.
- A GitHub workflow will kick off to automatically publish a new version to NPM: https://github.com/near/pagoda-ui/actions/workflows/publish-to-npm.yml
- The new version number published to NPM will be driven by the value in `package.json`.
- Confirm published changes by visiting package: https://www.npmjs.com/package/@near-pagoda/ui
