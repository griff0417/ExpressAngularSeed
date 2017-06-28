'use strict';

/**
 * CRUDService
 * =================================================
 * This is a generic CRUD service to perform http
 * requests to a generic REST API. Each operation
 * takes a name parameter. That name corresponds to
 * the name of a database collection and will be used
 * to look up tables in the API.
 */
angular.module('myApp.CRUDService', [])
.service('CRUDService', function($http) {
    var apiUrl = "/api/generic/";

    /**
     * READ
     * ==============================================
     * Gets all records with the given name.
     *
     * @param name : string - the object name of the records to get.
     *
     * NOTE: name is appended to the end of the API path
     * after the http://example.com/<apiUrl>/. It should be
     * the name of a database collection/table.
     */
    this.READALL = function(name) {
        return $http({
            method: 'GET',
            url: apiUrl + name
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
     * READ
     * ==============================================
     * Get a single record with the given name and id.
     *
     * @param name : string - the object name of the records to get.
     * @param id : int - the id of the record to get.
     *
     * NOTE: name is appended to the end of the API path
     * after the http://example.com/<apiUrl>/. It should be
     * the name of a database collection/table.
     */
     this.READ = function(name, id) {
         return $http.get(apiUrl + name + "/" + id)
             .then(function(res) {
                 return res.data;
             }, function(res) {
                 console.log(res);
                 return [];
             });
     }

     /**
      * CREATE
      * ==============================================
      * Create a new record of the given name with the given data.
      *
      * @param name : string - the object name of the records to get.
      * @param data : object - the data to create the record with.
      *
      * NOTE: name is appended to the end of the API path
      * after the http://example.com/<apiUrl>/. It should be
      * the name of a database collection/table.
      */
      this.CREATE = function(name, data) {
          return $http.post(apiUrl + name, data)
              .then(function(res) {
                 return true;
              }, function(res) {
                  console.log(res);
                  return false
              });
      }

      /**
       * UPDATE
       * ==============================================
       * Update an exisiting record of the given name
       * with the given id and data.
       *
       * @param name : string - the object name of the records to get.
       * @param id : int - the id of the record to get.
       * @param data : object - the data to create the record with.
       *
       * NOTE: name is appended to the end of the API path
       * after the http://example.com/<apiUrl>/. It should be
       * the name of a database collection/table.
       */
       this.UPDATE = function(name, id, data) {
           return $http.put(apiUrl + name + "/" + id, data)
               .then(function(res) {
                  return true;
               }, function(res) {
                   console.log(res);
                   return false
               });
       }

       /**
        * DELETE
        * ==============================================
        * Delete an exisiting record of th given name
        * with the given id.
        *
        * @param name : string - the object name of the records to get.
        * @param id : int - the id of the record to get.
        *
        * NOTE: name is appended to the end of the API path
        * after the http://example.com/<apiUrl>/. It should be
        * the name of a database collection/table.
        */
       this.DELETE = function(name, id) {
           return $http.delete(apiUrl + name + "/" + id)
               .then(function(res) {
                  return true;
               }, function(res) {
                   console.log(res);
                   return false
               });
       }
});
