'use strict';

angular.module('myApp.BlogPostService', [])
.service('BlogPostService', function($http) {
    var apiUrl = "";

    /**
     * getAllPosts
     * ==============================================
     * Get all blog posts from the DB and return them.
     */
    this.getAllPosts = function() {
        return $http({
            method: 'GET',
            url: apiUrl + '/api/post/'
        }).
        then(function (res) {
            return res.data;
        },
        function(res) {
            console.log(res);
            return [];
        });
    }

    /**
     * getPost
     * ==============================================
     * Get a single blog post by ID.
     */
     this.getPost = function(id) {
         return $http.get(apiUrl + "/api/post/" + id)
             .then(function(res) {
                 return res.data;
             }, function(res) {
                 console.log(res);
                 return [];
             });
     }

     /**
      * createPost
      * ==============================================
      * Create a new blog post with the given data.
      */
      this.createPost = function(data) {
          return $http.post(apiUrl + "/api/post/", data)
              .then(function(res) {
                 return true;
              }, function(res) {
                  console.log(res);
                  return false
              });
      }

      /**
       * updatePost
       * ==============================================
       * Update an exisiting blog post with the given id
       * and the given data.
       */
       this.updatePost = function(id, data) {
           return $http.put(apiUrl + "/api/post/" + id, data)
               .then(function(res) {
                  return true;
               }, function(res) {
                   console.log(res);
                   return false
               });
       }

       /**
        * deletePost
        * ==============================================
        * Delete an exisiting blog post with the given id
        * from the database.
        */
       this.deletePost = function(id) {
           return $http.delete(apiUrl + "/api/post/" + id)
               .then(function(res) {
                  return true;
               }, function(res) {
                   console.log(res);
                   return false
               });
       }
});
