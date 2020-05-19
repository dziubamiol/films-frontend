# IMPORTANT
Change ```export type * ...``` to ```export * ...``` inside ```/node-modules/testing-library__react/node-modules/pretty-format/build/index.d.ts``` and inside
```/node-modules/@testing-library/node-modules/pretty-format/build/index.d.ts```

This is a library issue.

## ```.env``` structure:

```REACT_APP_DOMAIN=<DOMAIN_FOR_API_CALLS>```

# Startup procedure

   1. Install last lts node.js https://nodejs.org/en/
   2. Install mongodb https://docs.mongodb.com/manual/installation/
   3. Create db inside mongodb with names: ```users```, ```films```
   4. Install backend following ```Startup procedure``` from https://github.com/dziubamiol/films-backend
   5. Pull master branch from https://github.com/dziubamiol/films-frontend
   6. Install all packages using: ```npm i```
   7. Setup ```.env``` following ```.env``` structure above. ```REACT_APP_DOMAIN``` should be equal backend domain that runs locally
   
   8. Start project locally running ```npm run start```, it should start at http://localhost:3000
   
    

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.
