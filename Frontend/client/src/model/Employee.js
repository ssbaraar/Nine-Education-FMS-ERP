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
 * The Employee model module.
 * @module model/Employee
 * @version 1.0.0
 */
export class Employee {
  /**
   * Constructs a new <code>Employee</code>.
   * @alias module:model/Employee
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Employee</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Employee} obj Optional instance to populate.
   * @return {module:model/Employee} The populated <code>Employee</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Employee();
      if (data.hasOwnProperty('employeeName'))
        obj.employeeName = ApiClient.convertToType(data['employeeName'], 'String');
      if (data.hasOwnProperty('role'))
        obj.role = ApiClient.convertToType(data['role'], 'String');
      if (data.hasOwnProperty('branch'))
        obj.branch = ApiClient.convertToType(data['branch'], 'String');
      if (data.hasOwnProperty('username'))
        obj.username = ApiClient.convertToType(data['username'], 'String');
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
      if (data.hasOwnProperty('phoneNumber'))
        obj.phoneNumber = ApiClient.convertToType(data['phoneNumber'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} employeeName
 */
Employee.prototype.employeeName = undefined;

/**
 * Allowed values for the <code>role</code> property.
 * @enum {String}
 * @readonly
 */
Employee.RoleEnum = {
  /**
   * value: "Manager"
   * @const
   */
  manager: "Manager",

  /**
   * value: "Accountant"
   * @const
   */
  accountant: "Accountant",

  /**
   * value: "Executive"
   * @const
   */
  executive: "Executive",

  /**
   * value: "Director"
   * @const
   */
  director: "Director"
};
/**
 * @member {module:model/Employee.RoleEnum} role
 */
Employee.prototype.role = undefined;

/**
 * @member {String} branch
 */
Employee.prototype.branch = undefined;

/**
 * @member {String} username
 */
Employee.prototype.username = undefined;

/**
 * @member {String} password
 */
Employee.prototype.password = undefined;

/**
 * @member {String} phoneNumber
 */
Employee.prototype.phoneNumber = undefined;

