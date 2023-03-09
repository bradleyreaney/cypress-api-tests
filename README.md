# Cypress API Tests

The following is an example of the Cypress api plugin created by Filip Hric. The plugin adds the ability to see the API information in the Cypress UI runner.

This demo will use the API restful-booker - https://restful-booker.herokuapp.com/apidoc/index.html

![image](https://github.com/filiphric/cypress-plugin-api/blob/HEAD/images/demo.gif)

The repo gives examples of the following features
 - The Cypress API plugin - https://www.npmjs.com/package/cypress-plugin-api
 - hideCredentials - https://www.npmjs.com/package/cypress-plugin-api#hiding-credentials
 - Cypress environmental variable management - https://docs.cypress.io/guides/guides/environment-variables

It's also written in TypeScript but this is not a requierment to use the plugin or any of its features.

## Pre-requisites

You will need to create a `cypress.env.json` file that contains the following information...
```
{
    "apiUsername: "",
    "apiPassword": ""
}
```
The credentials for the API can be found here - https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-CreateToken

After this run `npm i` to install all dependencies.

## How to run the Cypress tests

1. You can either run the commands `npm start` or `npx cypress open` to open the Cypress runner UI.
2. Select `E2E Testing` then `Start E2E Testing in Chrome`
3. From here you'll have two options
    - The `nonPlugin-restfulBooker.herokuApp.cy.js` spec which uses the standard `cy.request()` method
    - The `plugin-restfulBooker.herokuApp.cy.js` spec which uses the `cy.api()` method and `hideCredentials` feature
