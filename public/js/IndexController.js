'use strict';

/* Index Controller */
angular.module('myApp.IndexController', [])
.controller('IndexController', function ($scope, $http) {
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
