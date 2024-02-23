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
    describe('ResetPasswordRequest', function() {
      beforeEach(function() {
        instance = new SchoolManagementSystemApi.ResetPasswordRequest();
      });

      it('should create an instance of ResetPasswordRequest', function() {
        // TODO: update the code to test ResetPasswordRequest
        expect(instance).to.be.a(SchoolManagementSystemApi.ResetPasswordRequest);
      });

      it('should have the property username (base name: "username")', function() {
        // TODO: update the code to test the property username
        expect(instance).to.have.property('username');
        // expect(instance.username).to.be(expectedValueLiteral);
      });

      it('should have the property newPassword (base name: "newPassword")', function() {
        // TODO: update the code to test the property newPassword
        expect(instance).to.have.property('newPassword');
        // expect(instance.newPassword).to.be(expectedValueLiteral);
      });

      it('should have the property otp (base name: "otp")', function() {
        // TODO: update the code to test the property otp
        expect(instance).to.have.property('otp');
        // expect(instance.otp).to.be(expectedValueLiteral);
      });

    });
  });

}));
