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
 * The Student model module.
 * @module model/Student
 * @version 1.0.0
 */
export class Student {
  /**
   * Constructs a new <code>Student</code>.
   * @alias module:model/Student
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Student</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Student} obj Optional instance to populate.
   * @return {module:model/Student} The populated <code>Student</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Student();
      if (data.hasOwnProperty('applicationNumber'))
        obj.applicationNumber = ApiClient.convertToType(data['applicationNumber'], 'String');
      if (data.hasOwnProperty('dateOfJoining'))
        obj.dateOfJoining = ApiClient.convertToType(data['dateOfJoining'], 'String');
      if (data.hasOwnProperty('course'))
        obj.course = ApiClient.convertToType(data['course'], 'String');
      if (data.hasOwnProperty('firstName'))
        obj.firstName = ApiClient.convertToType(data['firstName'], 'String');
      if (data.hasOwnProperty('surName'))
        obj.surName = ApiClient.convertToType(data['surName'], 'String');
      if (data.hasOwnProperty('parentName'))
        obj.parentName = ApiClient.convertToType(data['parentName'], 'String');
      if (data.hasOwnProperty('gender'))
        obj.gender = ApiClient.convertToType(data['gender'], 'String');
      if (data.hasOwnProperty('batch'))
        obj.batch = ApiClient.convertToType(data['batch'], 'String');
      if (data.hasOwnProperty('branch'))
        obj.branch = ApiClient.convertToType(data['branch'], 'String');
      if (data.hasOwnProperty('yearOfJoining'))
        obj.yearOfJoining = ApiClient.convertToType(data['yearOfJoining'], 'String');
      if (data.hasOwnProperty('modeOfResidence'))
        obj.modeOfResidence = ApiClient.convertToType(data['modeOfResidence'], 'String');
      if (data.hasOwnProperty('primaryContact'))
        obj.primaryContact = ApiClient.convertToType(data['primaryContact'], 'String');
      if (data.hasOwnProperty('secondaryContact'))
        obj.secondaryContact = ApiClient.convertToType(data['secondaryContact'], 'String');
      if (data.hasOwnProperty('firstYearHostelFee'))
        obj.firstYearHostelFee = ApiClient.convertToType(data['firstYearHostelFee'], 'Number');
      if (data.hasOwnProperty('firstYearTuitionFee'))
        obj.firstYearTuitionFee = ApiClient.convertToType(data['firstYearTuitionFee'], 'Number');
      if (data.hasOwnProperty('secondYearHostelFee'))
        obj.secondYearHostelFee = ApiClient.convertToType(data['secondYearHostelFee'], 'Number');
      if (data.hasOwnProperty('secondYearTuitionFee'))
        obj.secondYearTuitionFee = ApiClient.convertToType(data['secondYearTuitionFee'], 'Number');
      if (data.hasOwnProperty('pendingFirstYearTuitionFee'))
        obj.pendingFirstYearTuitionFee = ApiClient.convertToType(data['pendingFirstYearTuitionFee'], 'Number');
      if (data.hasOwnProperty('pendingFirstYearHostelFee'))
        obj.pendingFirstYearHostelFee = ApiClient.convertToType(data['pendingFirstYearHostelFee'], 'Number');
      if (data.hasOwnProperty('pendingSecondYearTuitionFee'))
        obj.pendingSecondYearTuitionFee = ApiClient.convertToType(data['pendingSecondYearTuitionFee'], 'Number');
      if (data.hasOwnProperty('pendingSecondYearHostelFee'))
        obj.pendingSecondYearHostelFee = ApiClient.convertToType(data['pendingSecondYearHostelFee'], 'Number');
      if (data.hasOwnProperty('paidFirstYearTuitionFee'))
        obj.paidFirstYearTuitionFee = ApiClient.convertToType(data['paidFirstYearTuitionFee'], 'Number');
      if (data.hasOwnProperty('paidFirstYearHostelFee'))
        obj.paidFirstYearHostelFee = ApiClient.convertToType(data['paidFirstYearHostelFee'], 'Number');
      if (data.hasOwnProperty('paidSecondYearTuitionFee'))
        obj.paidSecondYearTuitionFee = ApiClient.convertToType(data['paidSecondYearTuitionFee'], 'Number');
      if (data.hasOwnProperty('paidSecondYearHostelFee'))
        obj.paidSecondYearHostelFee = ApiClient.convertToType(data['paidSecondYearHostelFee'], 'Number');
      if (data.hasOwnProperty('studentStatus'))
        obj.studentStatus = ApiClient.convertToType(data['studentStatus'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} applicationNumber
 */
Student.prototype.applicationNumber = undefined;

/**
 * @member {String} dateOfJoining
 */
Student.prototype.dateOfJoining = undefined;

/**
 * @member {String} course
 */
Student.prototype.course = undefined;

/**
 * @member {String} firstName
 */
Student.prototype.firstName = undefined;

/**
 * @member {String} surName
 */
Student.prototype.surName = undefined;

/**
 * @member {String} parentName
 */
Student.prototype.parentName = undefined;

/**
 * Allowed values for the <code>gender</code> property.
 * @enum {String}
 * @readonly
 */
Student.GenderEnum = {
  /**
   * value: "Male"
   * @const
   */
  male: "Male",

  /**
   * value: "Female"
   * @const
   */
  female: "Female"
};
/**
 * @member {module:model/Student.GenderEnum} gender
 */
Student.prototype.gender = undefined;

/**
 * @member {String} batch
 */
Student.prototype.batch = undefined;

/**
 * @member {String} branch
 */
Student.prototype.branch = undefined;

/**
 * @member {String} yearOfJoining
 */
Student.prototype.yearOfJoining = undefined;

/**
 * @member {String} modeOfResidence
 */
Student.prototype.modeOfResidence = undefined;

/**
 * @member {String} primaryContact
 */
Student.prototype.primaryContact = undefined;

/**
 * @member {String} secondaryContact
 */
Student.prototype.secondaryContact = undefined;

/**
 * @member {Number} firstYearHostelFee
 */
Student.prototype.firstYearHostelFee = undefined;

/**
 * @member {Number} firstYearTuitionFee
 */
Student.prototype.firstYearTuitionFee = undefined;

/**
 * @member {Number} secondYearHostelFee
 */
Student.prototype.secondYearHostelFee = undefined;

/**
 * @member {Number} secondYearTuitionFee
 */
Student.prototype.secondYearTuitionFee = undefined;

/**
 * @member {Number} pendingFirstYearTuitionFee
 */
Student.prototype.pendingFirstYearTuitionFee = undefined;

/**
 * @member {Number} pendingFirstYearHostelFee
 */
Student.prototype.pendingFirstYearHostelFee = undefined;

/**
 * @member {Number} pendingSecondYearTuitionFee
 */
Student.prototype.pendingSecondYearTuitionFee = undefined;

/**
 * @member {Number} pendingSecondYearHostelFee
 */
Student.prototype.pendingSecondYearHostelFee = undefined;

/**
 * @member {Number} paidFirstYearTuitionFee
 */
Student.prototype.paidFirstYearTuitionFee = undefined;

/**
 * @member {Number} paidFirstYearHostelFee
 */
Student.prototype.paidFirstYearHostelFee = undefined;

/**
 * @member {Number} paidSecondYearTuitionFee
 */
Student.prototype.paidSecondYearTuitionFee = undefined;

/**
 * @member {Number} paidSecondYearHostelFee
 */
Student.prototype.paidSecondYearHostelFee = undefined;

/**
 * Allowed values for the <code>studentStatus</code> property.
 * @enum {String}
 * @readonly
 */
Student.StudentStatusEnum = {
  /**
   * value: "Active"
   * @const
   */
  active: "Active",

  /**
   * value: "Cancelled"
   * @const
   */
  cancelled: "Cancelled"
};
/**
 * @member {module:model/Student.StudentStatusEnum} studentStatus
 */
Student.prototype.studentStatus = undefined;
