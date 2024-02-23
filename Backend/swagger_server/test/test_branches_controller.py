# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.branch import Branch  # noqa: E501
from swagger_server.models.branch_create_request import BranchCreateRequest  # noqa: E501
from swagger_server.models.branch_list import BranchList  # noqa: E501
from swagger_server.models.branch_update_request import BranchUpdateRequest  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.test import BaseTestCase


class TestBranchesController(BaseTestCase):
    """BranchesController integration test stubs"""

    def test_branches_branch_id_put(self):
        """Test case for branches_branch_id_put

        Update branch details
        """
        body = BranchUpdateRequest()
        response = self.client.open(
            '/api/v1/branches/{branchId}'.format(branch_id='branch_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_branches_delete(self):
        """Test case for branches_delete

        Delete a branch
        """
        query_string = [('branch_id', 'branch_id_example')]
        response = self.client.open(
            '/api/v1/branches',
            method='DELETE',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_branches_get(self):
        """Test case for branches_get

        Retrieve all branches
        """
        response = self.client.open(
            '/api/v1/branches',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_branches_post(self):
        """Test case for branches_post

        Create a new branch
        """
        body = BranchCreateRequest()
        response = self.client.open(
            '/api/v1/branches',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
