exports.config = {
  hostname: "selenium-hub",
  port: 4444,
  path: "/wd/hub",
  specs: [
      './tests/**/login.test.js'
  ],
  exclude: [
  ],
  maxInstances: 2,
  capabilities: [{
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
          args: ['headless', 'disable-gpu', 'no-sandbox'],
        },
  },
  {
    maxInstances: 1,
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless'],
      },
  }],
  logLevels: {
      webdriver: 'trace',
      webdriverio: 'trace',
      '@wdio/applitools-service': 'silent',
      '@wdio/mocha-framework': 'silent',
      '@wdio/jasmine-framework': 'silent',
      '@wdio/local-runner': 'trace',
      '@wdio/cli' : 'trace'
  },
  outputDir: "./logs",
  coloredLogs: true,
  screenshotPath: './failedTests/',
  baseUrl: 'https://airbnb.com/',
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [['allure', {
          outputDir: 'allure-results',
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: true,
  }]],
  mochaOpts: {
      ui: 'bdd',
      timeout: 60000
  },
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
      console.log('opening browser...')
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {
      browser.url(`/`)
      browser.maximizeWindow()
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  beforeTest: function (test, context) {
      const chai = require('chai')
      const chaiWebdriver = require('chai-webdriverio').default

      chai.use(chaiWebdriver(browser))

      global.assert = chai.assert
      global.should = chai.should
      global.expect = chai.expect
  },
  

  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  /**after: function (result, capabilities, specs) {
      browser.end()
  },*/
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  /**
  * Gets executed when a refresh happens.
  * @param {String} oldSessionId session ID of the old session
  * @param {String} newSessionId session ID of the new session
  */
}
