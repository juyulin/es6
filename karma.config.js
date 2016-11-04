var webpack = require('karma-webpack');
var webpackConfig = require('./webpack.config');
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
    loader: 'babel-loader'
  }
];
webpackConfig.module.postLoaders = [{
  test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
  loader: 'istanbul-instrumenter'
}];

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS', 'Chrome','Firefox'],
    frameworks: [ 'jasmine' ],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests/**/*_spec.js'
    ],
    colors: true,
    autoWatch: true,
    plugins: [
      webpack, 
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],
    reporters: ['progress'],
    preprocessors: {
      'tests/**/*_spec.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    client: {
      // log console output in our test console
      captureConsole: true
    },
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    singleRun: false, 
    browserNoActivityTimeout: 60000,
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  });
};
