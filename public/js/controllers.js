'use strict';

/* Generic Controllers */
angular.module('myApp.controllers', [])
.controller('IndexController', function ($scope, $http) {
    // Index controller
    $http({
        method: 'GET',
        url: '/api/post'
    }).
    then(function (res) {
        $scope.posts = res.data;
    },
    function(res) {
        console.log(res);
    });
});
