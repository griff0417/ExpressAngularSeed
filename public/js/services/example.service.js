'use strict';

/*
    Service

    This is a service example, generally each individual
    service should go in its own file.

    To use this service, inject it as a dependency to
    a controller/directive/filter/etc like so:
    'directive('<name_of_directive>', function(version) {'
*/

angular.module('myApp.service', []).
value('version', '0.1');
