/* global angular:false */
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
      link: function(scope, element) {
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

          element.html(JSON.stringify(json, prettifyJSON, indentKey)
            .replace(new RegExp('":', 'g'),'":' + indentValue + ''))

          $compile(element.contents())(scope);
        }

        function prettifyJSON(key, value) {
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            var replacement = {};
            for (var k in value) {
              if (Object.hasOwnProperty.call(value, k))
                replacement[replaceKey(k, value[k])] = value[k];
            }
            return replacement
          } else if (Array.isArray(value)) {
            for (var k in value) {
              return value
            }
          }

          return replaceValue(key, value);
        }
      }
    }
  }]);
