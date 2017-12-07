'use strict';

/* Login Controller */
angular.module('app.LoginController', [])
.controller('LoginController', function ($scope, $rootScope, AuthService, $routeParams, $timeout) {
    $scope.loadMessage = "";
    $scope.loadMessage = $routeParams.message;
    $scope.showLoginForm = true;

    // Called when the view has loaded
    $scope.$on('$viewContentLoaded', function() {

    });

    $scope.loginUser = {
        email: "",
        password: ""
    };

    $scope.signupUser = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    };

    /*
        login
        ==============================================
        Attempt to login and authenticate the user with
        the entered credentials.
    */
    $scope.login = function() {
        $timeout(function() {
            AuthService.login($scope.loginUser).then(function(response) {
                $scope.errorMessage = response;
            });
        }, 200);
    };

    /*
        signup
        ==============================================
        Create a new account with the given data.
    */
    $scope.signup = function() {
        $timeout(function() {
            AuthService.signup($scope.signupUser).then(function(response) {
                $scope.errorMessage = response;
            });
        }, 200);
    };

    // Enable enter key to submit forms
    $(document).keypress(function(e) {
        if (e.which == 13) {
            if ($scope.showLoginForm) {
                if ($scope.loginForm.$valid)
                    $("button[name='loginButton']").click();
            }
            else {
                if ($scope.signupForm.$valid)
                    $("button[name='signupButton']").click();
            }

            return false;
        }
    });
});
