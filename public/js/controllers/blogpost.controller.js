'use strict';

/* Blog Post Controllers */

angular.module("myApp.BlogPostController", [])

// Blog list controller
.controller('BlogListController', function ($scope, $http, BlogPostService) {
    BlogPostService.getAllPosts().then(function(data) {
        $scope.posts = data;
    });
})

// Read post controller
.controller("ReadPostController", function ($scope, $routeParams, BlogPostService) {
    BlogPostService.getPost($routeParams.id).then(function(data) {
        $scope.post = data;
    });
})

// Add post controller
.controller("AddPostController", function ($scope, $location, BlogPostService) {
    $scope.form = {};

    $scope.submitPost = function() {
        BlogPostService.createPost($scope.form).then(function(data) {
            if (data === true) {
                $location.path("/blog");
            }
            else {
                console.log("Error creating blog post...");
            }
        });
    };
})

// Edit post controller
.controller("EditPostController", function ($scope, $routeParams, $location, BlogPostService) {
    $scope.form = {};
    $scope.disableEdit = true;

    BlogPostService.getPost($routeParams.id).then(function(data) {
        $scope.form = data;
        $scope.disableEdit = false;
    });

    $scope.editPost = function() {
        BlogPostService.updatePost($routeParams.id, $scope.form).then(function(data) {
            if (data === true) {
                $location.url("/readPost/" + $routeParams.id);
            }
            else {
                console.log("Error updating blog post...");
            }
        });
    };
})

// Delete post controller
.controller("DeletePostController", function ($scope, $routeParams, $location, BlogPostService) {
    BlogPostService.getPost($routeParams.id).then(function(data) {
        $scope.post = data;
    });

    $scope.deletePost = function() {
        BlogPostService.deletePost($routeParams.id).then(function(data) {
            if (data === true) {
                $location.url("/blog");
            }
            else {
                console.log("Error deleting blog post...");
            }
        });
    };

    $scope.home = function() {
        $location.url('/blog');
    };
});
