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
 * The ResetPasswordRequest model module.
 * @module model/ResetPasswordRequest
 * @version 1.0.0
 */
export class ResetPasswordRequest {
  /**
   * Constructs a new <code>ResetPasswordRequest</code>.
   * @alias module:model/ResetPasswordRequest
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ResetPasswordRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResetPasswordRequest} obj Optional instance to populate.
   * @return {module:model/ResetPasswordRequest} The populated <code>ResetPasswordRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResetPasswordRequest();
      if (data.hasOwnProperty('username'))
        obj.username = ApiClient.convertToType(data['username'], 'String');
      if (data.hasOwnProperty('newPassword'))
        obj.newPassword = ApiClient.convertToType(data['newPassword'], 'String');
      if (data.hasOwnProperty('otp'))
        obj.otp = ApiClient.convertToType(data['otp'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} username
 */
ResetPasswordRequest.prototype.username = undefined;

/**
 * @member {String} newPassword
 */
ResetPasswordRequest.prototype.newPassword = undefined;

/**
 * @member {String} otp
 */
ResetPasswordRequest.prototype.otp = undefined;
