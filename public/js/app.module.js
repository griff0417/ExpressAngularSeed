'use strict';

// Declare app level module which depends on filters, and services

angular.module("app", [
    "ngRoute",

    "app.filter",

    "app.service",
    "app.CRUDService",

    "app.directive",

    "app.IndexController"
]).
config(function ($interpolateProvider, $routeProvider, $locationProvider) {

    // Index Route
    $routeProvider.
    when("/home", {
        templateUrl: "/templates/home.html",
        controller: "IndexController"
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
