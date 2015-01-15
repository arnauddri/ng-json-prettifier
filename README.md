# ng-json-prettifier [![Build Status](https://travis-ci.org/arnauddri/ng-json-prettifier.svg?branch=master)](https://travis-ci.org/arnauddri/ng-json-prettifier) 

ng-json-prettifier is a directive to customize your json in your web page. It provides much more flexibility than angular's built-in JSON filter as you can add classes to your JSON's keys and values and control the indentation and padding.

It is different from just using " | json". It let's you apply custom markup to keys/values depending upon the value of the key/value.

### Install

Via npm
```
npm install --save ng-json-prettifier
```

Via bower
```
bower install --save ng-json-prettifier
```

### Usage

Declare the directive as an element an pass it your arguments:

```html
  <pretty-json json='json' replace-key='replaceKey' replace-value='replaceValue' indent-key='4' indent-value='indentValue'></pretty-json>
```

#### Attributes

##### 1. Json

Your JSON item


##### 2. replaceKey (optional)

This function vill be called for each key and it must return the HTML which will be used for the key. Both the key and the correspounding value are passed as argument but only the key's HTML must be returned.

Ex:

```javascript
  var replaceKey = function(key, value) {
    if (value === 'foo') {
      return '<scan class=\'foo_key\'>' + key + '</scan>'
    } else {
      return '<scan class=\'bar_key\'>' + key + '</scan>'
    }
  }
```


##### 3. replaceValue (optional)

Same as replaceKey but for the JSON values:

Ex:

```javascript
  var replaceValue = function(key, value) {
    if (key === 'fiz') {
      return '<scan class=\'fiz_value\'>' + value + '</scan>'
    } else {
      return '<scan class=\'buz_value\'>' + value + '</scan>'
    }
  }
```

##### 4. IndentKey

Specify the keys indentation

##### 5. IndentValue

Specify the values indentation, i.e. the space between the keys and values

### Demo

The repo contains an example, structured as follows:

HTML:
```html
  <div ng-app='myApp'>
    <div ng-controller='MyController'>
      <pretty-json json='json' replace-key='replaceKey' replace-value='replaceValue' indent-key='4' indent-value='indentValue'></pretty-json>
    </div>
  </div>
```

JS:
```javascript
      angular.module('myApp', ['pretty.json'])
        .controller('MyController', function($scope) {
          $scope.json = {
            hello: "world",
            foo: "bar",
            fiz: "buz"
          };

          $scope.replaceKey = function(k, v) {
            return '<scan class=\'key\'>' + k + '</scan>'
          }

          $scope.replaceValue = function(k, v) {
            return '<scan class=\'value\'>' + v + '</scan>'
          }

          $scope.indentValue = ' ';
        })

```
