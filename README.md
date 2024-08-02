# NEAR/Pagoda UI

A React component library that implements the official design system of NEAR and Pagoda. Feel free to open up new issues for any bugs that you run into or any features/components you'd like to see implemented.

## Required Peer Dependencies

**React 18**

**Next JS >=13** - Some of our components rely on `next/link` and hooks like `router.push()`. We'll look into refactoring the library soon to remove the Next JS requirement so that our library can be used within any React framework.

**Zustand 4** - Our `openToast()` method is able to work in any context due to relying on a Zustand global store.

## Installation & Setup

```bash
pnpm add zustand next
pnpm add @near-pagoda/ui
```

In your `_app.tsx` file, you'll need to import the following CSS files:

```tsx
import '@near-pagoda/ui/globals.css';
import '@near-pagoda/ui/theme.css';
import '@near-pagoda/ui/lib.css';
```

## Documentation

Please refer to `README.md` files in `src/components` for examples and documentation of components.

## Contributing

TODO...

## Local Development

Due to this library having peer dependencies, `pnpm link` isn't compatible. Follow these steps to preview local changes to the UI library within any project:

- Have your project and the UI library cloned as siblings. EG: `projects/cool-project` and `projects/pagoda-ui`
- Inside `pagoda-ui`, make sure you've installed dependencies and build your changes with `pnpm i` and `pnpm build`
- Inside your project folder, run `pnpm add file:../pagoda-ui` and then boot up your dev server
- After making any changes to `pagoda-ui`, make sure you run `pnpm build` to then see changes when previewing your project
- Once you're done previewing changes, make sure you revert changes to the `package.json` and lock file in your project so that it no longer references `file:../pagoda-ui`.

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
