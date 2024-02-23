# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.employee import Employee  # noqa: E501
from swagger_server.models.employee_create_request import EmployeeCreateRequest  # noqa: E501
from swagger_server.models.employee_list import EmployeeList  # noqa: E501
from swagger_server.models.employee_update_request import EmployeeUpdateRequest  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.test import BaseTestCase


class TestEmployeesController(BaseTestCase):
    """EmployeesController integration test stubs"""

    def test_employees_delete(self):
        """Test case for employees_delete

        Delete an employee
        """
        query_string = [('employee_id', 'employee_id_example')]
        response = self.client.open(
            '/api/v1/employees',
            method='DELETE',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_employees_employee_id_put(self):
        """Test case for employees_employee_id_put

        Update employee details
        """
        body = EmployeeUpdateRequest()
        response = self.client.open(
            '/api/v1/employees/{employeeId}'.format(employee_id='employee_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_employees_get(self):
        """Test case for employees_get

        Retrieve all employees
        """
        response = self.client.open(
            '/api/v1/employees',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_employees_post(self):
        """Test case for employees_post

        Create a new employee
        """
        body = EmployeeCreateRequest()
        response = self.client.open(
            '/api/v1/employees',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
