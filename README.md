# NEAR/Pagoda UI

A React component library that implements the official design system of NEAR and Pagoda. Feel free to open up new issues for any bugs that you run into or any features/components you'd like to see implemented.

## Required Peer Dependencies

**React 18**

**Zustand 4** - Our `openToast()` method is able to work in any context due to relying on a Zustand global store.

## Installation & Setup

```bash
pnpm add zustand
pnpm add @near-pagoda/ui
```

In your `_app.tsx` file, import the following CSS files in order:

```tsx
import '@near-pagoda/ui/globals.css';
import '@near-pagoda/ui/theme.css';
import '@near-pagoda/ui/lib.css';
```

Wrap your application with the `<PagodaUiProvider>` to pass in your framework's `<Link>` component and router methods. You'll also want to include the `<Toaster />` component to display toasts when calling `openToast()`:

```tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PagodaUiProvider, Toaster } from '@near-pagoda/ui';

...

const router = useRouter();

...

<PagodaUiProvider
  value={{
    routerPrefetch: router.prefetch,
    routerPush: router.push,
    Link,
  }}
>
  ...
  <Toaster />
</PagodaUiProvider>
```

Why is `<PagodaUiProvider>` needed? Some of our components render anchor tags or dynamically change the current route. This provider allows our library to support any React framework (Vanilla/Vite, Next JS, etc) by passing in your router's components.

## Documentation

Please refer to `README.md` files in `src/components` for examples and documentation of components.

## Contributing

This project requires [pnpm](https://pnpm.io/installation) version `9.1.1`. The strict version requirement will help keep our lockfile consistent as more developers contribute. Make sure you have the correct version of `pnpm` installed:

```bash
pnpm -v # This should output 9.1.1
npm install -g pnpm@9.1.1 # Install the correct version if needed
```

Run these commands to begin local development and watch for changes:

```bash
pnpm dev
pnpm test:watch
```

- Create a branch off of `main`
- Test your local changes
- Push a PR for review

_NOTE: A development preview environment for the component library will be developed soon: https://github.com/near/pagoda-ui/issues/6_

## Test Local Changes

Follow these steps to preview local changes to the UI library within any project that depends on the library:

- Have your project and the UI library cloned as siblings. EG: `projects/cool-project` and `projects/pagoda-ui`.
- Inside `pagoda-ui`, run `pnpm dev`.
- Inside your project folder, run `pnpm add file:../pagoda-ui`.
- After making any changes to `pagoda-ui`, you will need to restart your project's development server for the component changes to appear locally within your project.
- Once you're done testing changes, make sure you revert the changes in your project's `package.json` and lock file so that you're no longer referencing the local file protocol (eg: `file:../pagoda-ui`).

_NOTE: Due to this library having peer dependencies, `pnpm link` isn't compatible - that's why we have to rely on using `file:` instead._

## Viewing Package Statistics

After you've run `pnpm build` or `pnpm dev`, a `stats.html` file will be generated to show a visual breakdown of the size of the library based on source code and dependencies. You can open this in your browser by running:

```bash
open ./stats.html
```

This can be helpful to catch or debug a dependency that might have bloated the package size.

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
