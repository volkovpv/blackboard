var path    = require('path'),
    html2js = require('karma-html2js-preprocessor');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basepath: '',

    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-html2js-preprocessor'),
      require('karma-browserify'),
      require('karma-source-map-support')
    ],


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine', 'source-map-support'],


    // list of files / patterns to load in the browser
    files: [
      path.dirname(require.resolve('jasmine-core')) + '/jasmine-core/jasmine.js',
        'www/*.html',
        'www/js/*.js',
        '__test__/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'www/*.html': ['html2js'],
      '__test__/*.js': [ 'browserify' ]

    },

    browserify: {
        watch: true,
        debug: true
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.log_disable || config.log_error || config.log_warn || config.log_info || config.log_debug
    loglevel: config.log_info,


    // enable / disable watching file and executing tests whenever any file changes
    autowatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['phantomjs', 'phantomjs_custom'],

    // you can define custom flags
    customlaunchers: {
      'phantomjs_custom': {
        base: 'phantomjs',
        options: {
          windowname: 'my-window',
          settings: {
            websecurityenabled: false
          }
        },
        flags: ['--remote-debugger-port=9000']
      }
    },


    // continuous integration mode
    // if true, karma captures browsers, runs the tests and exits
    singlerun: false


  });
};
