# Badges

<!-- ## Prerequisites
- Node.js version X.X.X
- npm version X.X.X
- Prisma installed globally
- Lerna installed globally -->

## Commands for Running the Project from Scratch

To run the project from scratch, use these commands in the root `badges` folder:

```bash
npm install
cd packages/backend
npm install
prisma generate
cd ../frontend
npm install
cd ../..
npx lerna run dev --parallel
```

## Monorepo with Lerna

This monorepo uses [Lerna](https://lerna.js.org/) to manage multiple packages within a single repository. The structure allows for shared dependencies and easier cross-package collaboration.

### Prerequisites

To get started with this monorepo, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Yarn](https://yarnpkg.com/) (recommended) or [npm](https://www.npmjs.com/)
- [Lerna](https://lerna.js.org/) (version 4.x or later)

### Installing Lerna

If Lerna is not already installed globally on your machine, you can install it with:

```bash
npm install -g lerna
```

### Scripts
Here are some useful scripts you can run from the root of the monorepo:

1. Run a command in all packages:
```bash
lerna run <command>
```
2. Run a command in a specific package (e.g., `frontend` or `backend`):
```bash
lerna run <command> --scope=<package-name>
```
3. Publish updated packages:
```bash
lerna publish
```
4. Add a new dependency to a package:
```bash
lerna add <dependency> --scope=<package-name>
```
