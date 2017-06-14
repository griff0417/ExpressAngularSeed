'use strict';

// Declare app level module which depends on filters, and services

angular.module("myApp", [
    "ngRoute",
    "myApp.IndexController",
    "myApp.filters",
    "myApp.services",
    "myApp.directives",
    "myApp.BlogPostController"
]).
config(function ($interpolateProvider, $routeProvider, $locationProvider) {

    // Change interpolation tags
    // $interpolateProvider.startSymbol('[{[');
    // $interpolateProvider.endSymbol(']}]');

    // setup angular routes
    $routeProvider.
    when("/", {
        templateUrl: "partials/index",
        controller: "IndexController"
    }).
    when("/addPost/", {
        templateUrl: "/partials/addPost",
        controller: "AddPostController"
    }).
    when("/readPost/:id/", {
        templateUrl: "/partials/readPost",
        controller: "ReadPostController"
    }).
    when("/editPost/:id/", {
        templateUrl: "/partials/editPost",
        controller: "EditPostController"
    }).
    when("/deletePost/:id/", {
        templateUrl: "/partials/deletePost",
        controller: "DeletePostController"
    }).
    otherwise({
      redirectTo: "/"
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
