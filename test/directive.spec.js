describe('ngPrettyJson', function() {
  'use strict';

  var element,
      $scope,
      $compile,
      doc = null,
      html =
        '<pretty-json json="json" replace-key="replaceKey" ' +
        'replace-value="replaceValue" indent-key="4" ' +
        'indent-value="indentValue"></pretty-json>';

  beforeEach(module('pretty.json'));

  beforeEach(function() {
    inject(function($document, $rootScope, _$compile_){
      $scope   = $rootScope.$new();
      $compile = _$compile_;
      angular.element($document[0].querySelectorAll('body')).append(html);
      doc      = $document[0];
    });
  });

  function compile() {
    element = angular.element(doc);
    $compile(element)($scope);
    $scope.$digest();
  }

  describe('Model binding', function() {

    beforeEach(function() {
      $scope.json = { hello: 'world', foo: 'bar', fiz: 'buz' };
      $scope.replaceKey = function(k, v) {
        return '<scan class=\'key\'>' + k + '</scan>'
      }
      $scope.replaceValue = function(k, v) {
        return '<scan class=\'value\'>' + v + '</scan>'
      }
      $scope.indentValue = ' ';
    });

    it('adds the class "value" to the JSON values', function() {
      compile()
      var val = doc.getElementsByClassName('value')
      expect(val.length).toEqual(3)
      expect(angular.element(val[0]).hasClass('value')).toBe(true)
      expect(angular.element(val[1]).hasClass('value')).toBe(true)
      expect(angular.element(val[2]).hasClass('value')).toBe(true)
    });

    it('adds the class "key" to the JSON keys', function() {
      var key = doc.getElementsByClassName('key')
      expect(key.length).toEqual(3)
      expect(angular.element(key[0]).hasClass('key')).toBe(true)
      expect(angular.element(key[1]).hasClass('key')).toBe(true)
      expect(angular.element(key[2]).hasClass('key')).toBe(true)
    });

    it('adds the expected space between the JSON keys and value', function() {
      var span = doc.querySelectorAll('span')[1];
      expect(angular.element(span).html().indexOf('": ' + $scope.indentValue + '"')).toEqual(0)
    });
  });

});
