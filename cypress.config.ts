import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'casino-demo-challenge',
  viewportWidth: 1024,
  viewportHeight: 800,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 10000,
  env: {
    TAGS: 'not @ignore',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require('./webpack.config.js')
      };
      const webpack = require('@cypress/webpack-preprocessor');
      on('file:preprocessor', webpack(options));
    },
    baseUrl: 'https://demo.casino/',
    specPattern: 'cypress/e2e/**/*.feature',
  },
})
