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

  beforeEach(function() {
    instance = new SchoolManagementSystemApi.AuthorizationApi();
  });

  describe('(package)', function() {
    describe('AuthorizationApi', function() {
      describe('login', function() {
        it('should call login successfully', function(done) {
          // TODO: uncomment, update parameter values for login call and complete the assertions
          /*

          instance.login(body, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(SchoolManagementSystemApi.Response);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('sendMail', function() {
        it('should call sendMail successfully', function(done) {
          // TODO: uncomment, update parameter values for sendMail call and complete the assertions
          /*

          instance.sendMail(body, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(SchoolManagementSystemApi.Response);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
      describe('sendPassword', function() {
        it('should call sendPassword successfully', function(done) {
          // TODO: uncomment, update parameter values for sendPassword call and complete the assertions
          /*

          instance.sendPassword(body, function(error, data, response) {
            if (error) {
              done(error);
              return;
            }
            // TODO: update response assertions
            expect(data).to.be.a(SchoolManagementSystemApi.Response);

            done();
          });
          */
          // TODO: uncomment and complete method invocation above, then delete this line and the next:
          done();
        });
      });
    });
  });

}));
