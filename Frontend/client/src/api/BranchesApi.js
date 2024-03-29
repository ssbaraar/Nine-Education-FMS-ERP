/*
 * School Management System API
 * APIs for managing branches, employees, students, receipts, etc.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: tejabhargavpodila@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.52
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from "../ApiClient";
import {Branch} from '../model/Branch';
import {Error} from '../model/Error';

/**
* Branches service.
* @module api/BranchesApi
* @version 1.0.0
*/
export class BranchesApi {

    /**
    * Constructs a new BranchesApi. 
    * @alias module:api/BranchesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the branchesPost operation.
     * @callback moduleapi/BranchesApi~branchesPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Branch{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new branch
     * Add a new branch to the system.
     * @param {module:model/Branch} body 
     * @param {module:api/BranchesApi~branchesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    branchesPost(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling branchesPost");
      }

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Branch;

      return this.apiClient.callApi(
        '/branches', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}