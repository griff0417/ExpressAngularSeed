'use strict';

/*
    Directive

    This is a directive example, generally each individual
    directive should go in its own file.

    This example is injecting the 'version' service value:
    'function(version) {'

    To use this directive, add 'app-version' as an attribute
    to an HTML tag that can hold text.
*/

angular.module('myApp.directive', []).
directive('appVersion', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
});
