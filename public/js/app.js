'use strict';

// Declare app level module which depends on filters, and services

angular.module("myApp", [
    "ngRoute",
    "myApp.filters",
    "myApp.services",
    "myApp.directives",
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
        controller: "IndexController"
    }).
    when("/addPost", {
        templateUrl: "view/blog/addPost",
        controller: "AddPostController"
    }).
    when("/readPost/:id/", {
        templateUrl: "/view/blog/readPost",
        controller: "ReadPostController"
    }).
    when("/editPost/:id/", {
        templateUrl: "/view/blog/editPost",
        controller: "EditPostController"
    }).
    when("/deletePost/:id/", {
        templateUrl: "/view/blog/deletePost",
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
