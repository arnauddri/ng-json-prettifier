describe('ngPrettyJson', function() {
  var elm, scope;

  var module;
  beforeEach(function() {
    module = angular.module('pretty.json');
  });

  it('should be registered', function() {
    expect(module).not.toBe(null);
  });
});
