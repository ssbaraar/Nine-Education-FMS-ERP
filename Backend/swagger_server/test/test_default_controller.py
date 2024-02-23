# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.bulk_update_request import BulkUpdateRequest  # noqa: E501
from swagger_server.models.bulk_update_response import BulkUpdateResponse  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_bulk_update_student_post(self):
        """Test case for bulk_update_student_post

        Bulk update students
        """
        body = BulkUpdateRequest()
        response = self.client.open(
            '/api/v1/bulk-update-student',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
