# Cypress API Tests

An example of the Cypress api plugin created by Filip Hric.

The plugin shows the API information in the Cypress UI runner.

The demo will use the API restful-booker - https://restful-booker.herokuapp.com/apidoc/index.html

![image](https://github.com/filiphric/cypress-plugin-api/blob/HEAD/images/demo.gif)

This repo gives examples of the following features
 - The Cypress API plugin - https://www.npmjs.com/package/cypress-plugin-api
 - hideCredentials - https://www.npmjs.com/package/cypress-plugin-api#hiding-credentials
 - Cypress environmental variable management - https://docs.cypress.io/guides/guides/environment-variables

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

## How to run

1. Run the command `npx cypress open` to open the Cypress runner UI.
2. Select `E2E Testing` then `Start E2E Testing in Chrome`
3. Click `restfulBooker.herokuApp.cy.js` and the tests will start to run.
