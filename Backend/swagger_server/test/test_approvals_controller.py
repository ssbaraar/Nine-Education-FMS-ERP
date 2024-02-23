# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.approval_request import ApprovalRequest  # noqa: E501
from swagger_server.models.approval_response import ApprovalResponse  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.test import BaseTestCase


class TestApprovalsController(BaseTestCase):
    """ApprovalsController integration test stubs"""

    def test_approvals_post(self):
        """Test case for approvals_post

        Approve an entity
        """
        body = ApprovalRequest()
        response = self.client.open(
            '/api/v1/approvals',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
