# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.report_data import ReportData  # noqa: E501
from swagger_server.test import BaseTestCase


class TestReportsController(BaseTestCase):
    """ReportsController integration test stubs"""

    def test_reports_get(self):
        """Test case for reports_get

        Generate reports
        """
        query_string = [('report_type', 'report_type_example')]
        response = self.client.open(
            '/api/v1/reports',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
