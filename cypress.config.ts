import { defineConfig } from "cypress";

const cucumber = require('cypress-cucumber-preprocessor').default

const browserify = require("@cypress/browserify-preprocessor");

const options = {

  ...browserify.defaultOptions,

  typescript: require.resolve("typescript"),

};

export default defineConfig({

  e2e: {

    setupNodeEvents(on, config) {

      on('file:preprocessor',cucumber())

      on("file:preprocessor", cucumber(options));

    },

    specPattern: '**/*'

  },

});

