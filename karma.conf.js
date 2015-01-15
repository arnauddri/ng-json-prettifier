module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // libraries
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',

      // our app
      'dist/ng-json-prettifier.js',

      // tests
      'test/*.js',
    ],

    autoWatch: true,

    browsers: ['Chrome']
  });
};
