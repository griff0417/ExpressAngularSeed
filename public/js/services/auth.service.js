'use strict';

/**
 * AuthService
 * =================================================
 * This service is built to handle all authentication
 * between the client and the server.
 */
angular.module('app.AuthService', [])
.service('AuthService', function($http, $location) {
    var apiUrl = "/api/";
    var successRedirect = "/home";

    /**
     * login
     * ==============================================
     * Attempt to login and authenticate the user
     * with the given credentials.
     *
     * @param credentials : object - the email and password.
     */
    this.login = function(credentials) {
        return $http.post(apiUrl + "login", credentials)
            .then(function(res) {
                var message = res.data.message;
                if (message === "ok") {
                    sessionStorage.setItem('user_id', JSON.stringify(res.data.user._id));
                    window.location = successRedirect;
                }
                else {
                    return message[0];
                }
            }, function(res) {
                console.log(res);
                return res;
            });
    };

    /**
     * signup
     * ==============================================
     * Create a new account with the given info.
     *
     * @param data : object - the data to signup with.
     */
    this.signup = function(data) {
        return $http.post(apiUrl + "signup", data)
            .then(function(res) {
               var message = res.data.message;
               if (message === "ok") {
                   sessionStorage.setItem("user_id", JSON.stringify(res.data.user._id));
                   window.location = successRedirect;
               }
               else {
                   return message[0];
               }
            }, function(res) {
                console.log(res);
                return res;
            });
    };
});
