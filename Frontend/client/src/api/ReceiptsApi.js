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
import {ReceiptCreateRequest} from '../model/ReceiptCreateRequest';
import {Response} from '../model/Response';

/**
* Receipts service.
* @module api/ReceiptsApi
* @version 1.0.0
*/
export class ReceiptsApi {

    /**
    * Constructs a new ReceiptsApi. 
    * @alias module:api/ReceiptsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the receiptsPost operation.
     * @callback moduleapi/ReceiptsApi~receiptsPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Response{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new receipt
     * Add a new receipt to the system.
     * @param {module:model/ReceiptCreateRequest} body 
     * @param {module:api/ReceiptsApi~receiptsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    receiptsPost(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling receiptsPost");
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
        '/receipt/create', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}