# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.receipt import Receipt  # noqa: E501
from swagger_server.models.receipt_create_request import ReceiptCreateRequest  # noqa: E501
from swagger_server.models.receipt_list import ReceiptList  # noqa: E501
from swagger_server.models.receipt_update_request import ReceiptUpdateRequest  # noqa: E501
from swagger_server.test import BaseTestCase


class TestReceiptsController(BaseTestCase):
    """ReceiptsController integration test stubs"""

    def test_receipts_delete(self):
        """Test case for receipts_delete

        Delete a receipt
        """
        query_string = [('receipt_id', 'receipt_id_example')]
        response = self.client.open(
            '/api/v1/receipts',
            method='DELETE',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_receipts_get(self):
        """Test case for receipts_get

        Retrieve all receipts
        """
        response = self.client.open(
            '/api/v1/receipts',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_receipts_post(self):
        """Test case for receipts_post

        Create a new receipt
        """
        body = ReceiptCreateRequest()
        response = self.client.open(
            '/api/v1/receipts',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_receipts_receipt_id_put(self):
        """Test case for receipts_receipt_id_put

        Update receipt details
        """
        body = ReceiptUpdateRequest()
        response = self.client.open(
            '/api/v1/receipts/{receiptId}'.format(receipt_id='receipt_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
