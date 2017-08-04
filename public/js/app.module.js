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
        templateUrl: "/templates/home.html",
        controller: "IndexController"
    });

    // Blog Routes
    $routeProvider.
    when("/blog", {
        templateUrl: "/templates/blog/blog.html",
        controller: "BlogListController"
    }).
    when("/addPost", {
        templateUrl: "/templates/blog/add_post.html",
        controller: "AddPostController"
    }).
    when("/readPost/:id/", {
        templateUrl: "/templates/blog/read_post.html",
        controller: "ReadPostController"
    }).
    when("/editPost/:id/", {
        templateUrl: "/templates/blog/edit_post.html",
        controller: "EditPostController"
    }).
    when("/deletePost/:id/", {
        templateUrl: "/templates/blog/delete_post.html",
        controller: "DeletePostController"
    });

    // Otherwise Route (if no others match)
    $routeProvider.
    otherwise({
        redirectTo: "/"
    });

    $locationProvider.html5Mode({
        enabled: true
    });
});
