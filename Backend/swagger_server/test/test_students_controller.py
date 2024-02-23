# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.student import Student  # noqa: E501
from swagger_server.models.student_create_request import StudentCreateRequest  # noqa: E501
from swagger_server.models.student_list import StudentList  # noqa: E501
from swagger_server.models.student_update_request import StudentUpdateRequest  # noqa: E501
from swagger_server.test import BaseTestCase


class TestStudentsController(BaseTestCase):
    """StudentsController integration test stubs"""

    def test_students_delete(self):
        """Test case for students_delete

        Delete a student
        """
        query_string = [('student_id', 'student_id_example')]
        response = self.client.open(
            '/api/v1/students',
            method='DELETE',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_students_get(self):
        """Test case for students_get

        Retrieve all students
        """
        response = self.client.open(
            '/api/v1/students',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_students_post(self):
        """Test case for students_post

        Create a new student
        """
        body = StudentCreateRequest()
        response = self.client.open(
            '/api/v1/students',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_students_student_id_put(self):
        """Test case for students_student_id_put

        Update student details
        """
        body = StudentUpdateRequest()
        response = self.client.open(
            '/api/v1/students/{studentId}'.format(student_id='student_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
