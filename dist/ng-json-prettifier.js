if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'pretty.json';
}

(function (window, angular, undefined) {
  /*jshint globalstrict:true*/
  /*global angular:false, window: true*/
  /*jshint unused:false*/
  'use strict';

  angular.module('pretty.json', [])
    .directive('prettyJson',  ['$compile', function($compile) {
      return {
        restrict: 'E',
        replace: true,
        template: '<pre></pre>',
        scope: {
          json: '=json',
          replaceKey: '=replaceKey',
          replaceValue: '=replaceValue',
          indentValue: '=',
          indentKey: '='
        },
        link: function(scope, element, attrs) {
          if (scope.json)
            compileJSON(scope.json)

          scope.$watch(
            function() { return scope.json; },
            compileJSON
          )

          var replaceKey   = scope.replaceKey || function(key, value) { return key };
          var replaceValue = scope.replaceValue || function(key, value) { return value };
          var indentValue  = scope.indentValue || '    ';
          var indentKey    = scope.indentKey || 10;

          function compileJSON(json) {
            if (!json || typeof json !== 'object')
              return;

            element.html(JSON.stringify(json, prettifyJSON, indentKey).replace(new RegExp('":', 'g'),'":' + indentValue + ''))
            $compile(element.contents())(scope);
          }

          function prettifyJSON(key, value) {
            if (value && typeof value === 'object') {
              var replacement = {};
              for (var k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                  replacement[replaceKey(k, value[k])] = value[k];
                }
              }
              return replacement
            }

            return replaceValue(key, value);
          }
        }
      }
    }]);

})(window, window.angular);
