'use strict';

/* Index Controller */
angular.module('app.IndexController', [])
.controller('IndexController', function ($scope, CRUDService) {
    $scope.message = "Express Angular Seed";

    // Demonstration of generic CRUD service
    CRUDService.READALL("post").then(function(data) {
        $scope.list = data;
    });

    $scope.logout = function() {
        window.location.replace("/logout");
    };
});
