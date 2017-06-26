'use strict';

// Declare app level module which depends on filters, and services

angular.module("myApp", [
    "ngRoute",

    "myApp.filter",

    "myApp.service",
    "myApp.BlogPostService",

    "myApp.directive",

    "myApp.IndexController",
    "myApp.BlogPostController"
]).
config(function ($interpolateProvider, $routeProvider, $locationProvider) {

    // Index Route
    $routeProvider.
    when("/", {
        templateUrl: "view/home",
        controller: "IndexController"
    });

    // Blog Routes
    $routeProvider.
    when("/blog", {
        templateUrl: "view/blog/blog",
        controller: "BlogListController"
    }).
    when("/addPost", {
        templateUrl: "view/blog/add_post",
        controller: "AddPostController"
    }).
    when("/readPost/:id/", {
        templateUrl: "/view/blog/read_post",
        controller: "ReadPostController"
    }).
    when("/editPost/:id/", {
        templateUrl: "/view/blog/edit_post",
        controller: "EditPostController"
    }).
    when("/deletePost/:id/", {
        templateUrl: "/view/blog/delete_post",
        controller: "DeletePostController"
    });

    // Otherwise Route (if no others match)
    $routeProvider.
    otherwise({
        redirectTo: "/"
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
