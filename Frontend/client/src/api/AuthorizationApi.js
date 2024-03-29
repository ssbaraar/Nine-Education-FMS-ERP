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
import {Error} from '../model/Error';
import {LoginRequest} from '../model/LoginRequest';
import {Response} from '../model/Response';
import {SendEmailRequest} from '../model/SendEmailRequest';
import {SendPasswordRequest} from '../model/SendPasswordRequest';

/**
* Authorization service.
* @module api/AuthorizationApi
* @version 1.0.0
*/
export class AuthorizationApi {

    /**
    * Constructs a new AuthorizationApi. 
    * @alias module:api/AuthorizationApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the login operation.
     * @callback moduleapi/AuthorizationApi~loginCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Response{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Login
     * Login to the system.
     * @param {module:model/LoginRequest} body 
     * @param {module:api/AuthorizationApi~loginCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    login(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling login");
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
      let returnType = Response;

      return this.apiClient.callApi(
        '/login', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the sendMail operation.
     * @callback moduleapi/AuthorizationApi~sendMailCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Response{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send mail
     * Send mail.
     * @param {module:model/SendEmailRequest} body 
     * @param {module:api/AuthorizationApi~sendMailCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    sendMail(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling sendMail");
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
      let returnType = Response;

      return this.apiClient.callApi(
        '/send_mail', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the sendPassword operation.
     * @callback moduleapi/AuthorizationApi~sendPasswordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Response{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send password
     * Send password.
     * @param {module:model/SendPasswordRequest} body 
     * @param {module:api/AuthorizationApi~sendPasswordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    sendPassword(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling sendPassword");
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
      let returnType = Response;

      return this.apiClient.callApi(
        '/send_password', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}