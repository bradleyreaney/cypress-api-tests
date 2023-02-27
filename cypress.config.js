const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    hideCredentials : true,
    baseUrl: 'https://restful-booker.herokuapp.com'
  },
});
