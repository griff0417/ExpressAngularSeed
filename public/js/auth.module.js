'use strict';

angular.module("auth", [
    "ngRoute",
    "app.AuthService",
    "app.LoginController"
]).
config(function ($interpolateProvider, $routeProvider, $locationProvider) {

    // Index Route
    $routeProvider
    .when("/", {
        templateUrl: "/templates/login.html",
        controller: "LoginController"
    });

    $locationProvider.html5Mode({
        enabled: true
    });
});
