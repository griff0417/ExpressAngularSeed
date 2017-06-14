'use strict';

/* Controllers */

angular.module("myApp.BlogPostController", [])
.controller("AddPostController", function ($scope, $http, $location) {
    // Add post controller
    $scope.form = {};

    $scope.submitPost = function() {
        $http.post("/api/post", $scope.form)
            .then(function(res) {
                $location.path("/");
            }, function(res) {
                console.log(res);
            });
    };
})
.controller("ReadPostController", function ($scope, $http, $routeParams) {
    // Read post controller
    $http.get("/api/post/" + $routeParams.id)
        .then(function(res) {
            $scope.post = res.data;
        }, function(res) {
            console.log(res);
        });
})
.controller("EditPostController", function ($scope, $http, $routeParams, $location) {
    // Edit post controller
    $scope.form = {};
    $scope.disableEdit = true;

    $http.get("/api/post/" + $routeParams.id)
        .then(function(res) {
            $scope.form = res.data;
            $scope.disableEdit = false;
        }, function(res) {
            console.log(res);
        });

    $scope.editPost = function() {
        $http.put("/api/post/" + $routeParams.id, $scope.form)
            .then(function(res) {
                $location.url("/readPost/" + $routeParams.id);
            }, function(res) {
                console.log(res);
            });
    };
})
.controller("DeletePostController", function ($scope, $http, $routeParams, $location) {
    // Delete post controller
    $http.get("/api/post/" + $routeParams.id)
        .then(function(res) {
            $scope.post = res.data;
        }, function(res) {
            console.log(res);
        });

    $scope.deletePost = function() {
        $http.delete("/api/post/" + $routeParams.id)
            .then(function(res) {
                $location.url("/");
            }, function(res) {
                console.log(res);
            });
    };

    $scope.home = function() {
        $location.url('/');
    };
});