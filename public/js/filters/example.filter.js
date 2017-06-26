'use strict';

/*
    Filter

    This is a filter example, generally each individual
    filter should go in its own file.

    This example is injecting the 'version' service value:
    'function(version) {'

    To use this filter, apply it to a binding or repeat
    liek so:
    '{{ <variable containing string> | interpolateVersion }}'
*/

angular.module('myApp.filter', []).
filter('interpolateVersion', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
});
