# Squirrel Shop

A simplified version of the main and cart page of a online store

## Available Scripts

### Development

To start the development server, run:

```bash
npm run dev
```

This will launch the Vite dev server and serve your application with hot module replacement (HMR) enabled for a smooth development experience.

---

### Build

To build the project for production, use:

```bash
npm run build
```

This script does the following:

1. Runs TypeScript compilation with `tsc -b` to ensure type checking and transpilation.
2. Builds the application using Vite for optimized production assets.

---

### Preview

To preview the production build locally, run:

```bash
npm run preview
```

This starts a local server to test the production build as it would run in a live environment.

---

### Lint

To check your code for linting issues, execute:

```bash
npm run lint
```

This uses ESLint to enforce code quality and consistency.

---

### Test

To run tests, use:

```bash
npm run test
```

This will execute your tests using Vitest, a fast and modern testing framework.

---

## Comments

1. In addition to the basket, it was also necessary to create another global space for products, since they are influenced by several components at once.

2. I was confused by the API provided for this task, I really didn’t want the ability to manage query parameters, such as for filtering, sorting and pagination.

3. I still couldn't reduce the number of re-renders in this case, especially when pagination is completely performed on the fly by the frontend, probably I still don't have enough skills for it.

4. I am very glad that I was able to touch testing, I've never written anything like this before so I stopped on basic unit test of a button.
