'use strict';

/* Index Controller */
angular.module('myApp.IndexController', [])
.controller('IndexController', function ($scope, $http, $timeout) {
    $scope.time = "loading time...";
    $scope.tickInterval = 1000;

    // JQuery test
    $("#jquery-test").append("<p>If you're reading this, JQuery is working!</p>");


    // Ticking clock to show the current time
    var tickTime = function() {
        var tz = moment.tz.guess();
        $scope.time = moment().tz(tz).format("h:mm:ss a");
        $timeout(tickTime, $scope.tickInterval);
    }
    $timeout(tickTime, $scope.tickInterval);
});
