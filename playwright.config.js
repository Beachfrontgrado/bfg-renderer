// playwright.config.js

export default {

  use: {

    headless: true,

    ignoreHTTPSErrors: true,

    viewport: {

      width: 1440,

      height: 2000,

    },

    userAgent:
      "Mozilla/5.0 (compatible; BeachfrontGrado Renderer/1.0)",

    javaScriptEnabled: true,

    bypassCSP: true,

  },

  timeout: 120000,

};
