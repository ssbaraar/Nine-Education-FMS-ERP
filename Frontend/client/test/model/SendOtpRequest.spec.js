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
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.SchoolManagementSystemApi);
  }
}(this, function(expect, SchoolManagementSystemApi) {
  'use strict';

  var instance;

  describe('(package)', function() {
    describe('SendOtpRequest', function() {
      beforeEach(function() {
        instance = new SchoolManagementSystemApi.SendOtpRequest();
      });

      it('should create an instance of SendOtpRequest', function() {
        // TODO: update the code to test SendOtpRequest
        expect(instance).to.be.a(SchoolManagementSystemApi.SendOtpRequest);
      });

      it('should have the property email (base name: "email")', function() {
        // TODO: update the code to test the property email
        expect(instance).to.have.property('email');
        // expect(instance.email).to.be(expectedValueLiteral);
      });

    });
  });

}));