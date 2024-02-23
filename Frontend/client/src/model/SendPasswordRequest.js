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
import {ApiClient} from '../ApiClient';

/**
 * The SendPasswordRequest model module.
 * @module model/SendPasswordRequest
 * @version 1.0.0
 */
export class SendPasswordRequest {
  /**
   * Constructs a new <code>SendPasswordRequest</code>.
   * @alias module:model/SendPasswordRequest
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>SendPasswordRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SendPasswordRequest} obj Optional instance to populate.
   * @return {module:model/SendPasswordRequest} The populated <code>SendPasswordRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SendPasswordRequest();
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} email
 */
SendPasswordRequest.prototype.email = undefined;
