## FinApp

FinApp is a software platform for registration between banking and end users.

## Technologies

1. [Node.js v14.16.0 or later](https://nodejs.org/en/)
2. [Next.js 11.0.0 or later](https://nextjs.org/)
3. [React 16.13.1 or later](https://reactjs.org/)
4. [Ant.design 16.13.1 or later](https://ant.design/)

## Getting Started [Setup]

- First thing first, If you don’t have Node.js installed [install it from here](https://nodejs.org/en/). You’ll need Node.js version v14.16.0 or later.
- Clone project `git clone git@bitbucket.org:naveed_co/finapp-react.git`
- do git `git fetch remote --all` then `git checkout development``
- Install dependencies `yarn install`
- Run the development server `yarn dev`

```bash
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```

## Git Structure

- `Production` is most stable branch for the production.
- `Stage` is most stable branch for the staging.
- `Develop` is most stable branch for the dev environment.
- `release` release is a version for clients and testers like a copy of production with new things.
- `Production` branch probably be locked, merge request is needed to be generated for adding new features or resolving bugs.
- New branches should be created from Develop.

## Type of Git commits

- `refactor` Refactoring a specific section of the codebase.
- `fix` A bug fix.
- `feat` The new feature you're adding that requires great courage, skill, or strength.
- `style` Feature and updates related to styling.
- `docs` Everything related to documentation.
- `Test` Everything related to documentation.

## Dependencies

1. [react ^16.13.1](https://reactjs.org/)
2. [react-dom ^16.13.1](https://reactjs.org/docs/react-dom.html)
3. [react-hook-form ^5.7.2](https://react-hook-form.com/get-started)
4. [localforage ^1.7.4](https://localforage.github.io/localForage/#localforage)
5. [classnames ^2.2.6](https://www.npmjs.com/package/classnames)
6. [ReactRedux ^7.1.6](https://react-redux.js.org/)
   ... [other]

## Naming Convention

- Component Name e.g `ComponentName`
- Function Name e.g `functionName`
- Constant Name e.g `CONSTANT` or `CONSTANT_NAME`
- Variable Name e.g `varName`
- Page Name (Route) e.g `blog` or `blog-all-posts`

## Notes

- Always use `yarn` for installing dependencies.
- Always format code before push with `TypeScript and JavaScript Language Features`.
- Always check `eslint errors and warning` before push.
- CSS: class name with the dash `-` is not valid in Next JS framework. You can use like this e.g `btnInfo` or `btnSubmit`

## Scripts

Core scripts

```bash
  yarn dev
    Starts the development server.

  yarn build
    Builds the app for production.

  yarn start
    Runs the built app in production mode.
```

## Deployment

Coming soon...

## Learn Next JS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next JS Sample Projects](https://github.com/vercel/next.js/tree/canary/examples) - check sample projects for learning

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
