# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class Employee(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, employee_name: str=None, role: str=None, branch: str=None, username: str=None, password: str=None, phone_number: str=None):  # noqa: E501
        """Employee - a model defined in Swagger

        :param employee_name: The employee_name of this Employee.  # noqa: E501
        :type employee_name: str
        :param role: The role of this Employee.  # noqa: E501
        :type role: str
        :param branch: The branch of this Employee.  # noqa: E501
        :type branch: str
        :param username: The username of this Employee.  # noqa: E501
        :type username: str
        :param password: The password of this Employee.  # noqa: E501
        :type password: str
        :param phone_number: The phone_number of this Employee.  # noqa: E501
        :type phone_number: str
        """
        self.swagger_types = {
            'employee_name': str,
            'role': str,
            'branch': str,
            'username': str,
            'password': str,
            'phone_number': str
        }

        self.attribute_map = {
            'employee_name': 'employeeName',
            'role': 'role',
            'branch': 'branch',
            'username': 'username',
            'password': 'password',
            'phone_number': 'phoneNumber'
        }
        self._employee_name = employee_name
        self._role = role
        self._branch = branch
        self._username = username
        self._password = password
        self._phone_number = phone_number

    @classmethod
    def from_dict(cls, dikt) -> 'Employee':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Employee of this Employee.  # noqa: E501
        :rtype: Employee
        """
        return util.deserialize_model(dikt, cls)

    @property
    def employee_name(self) -> str:
        """Gets the employee_name of this Employee.


        :return: The employee_name of this Employee.
        :rtype: str
        """
        return self._employee_name

    @employee_name.setter
    def employee_name(self, employee_name: str):
        """Sets the employee_name of this Employee.


        :param employee_name: The employee_name of this Employee.
        :type employee_name: str
        """

        self._employee_name = employee_name

    @property
    def role(self) -> str:
        """Gets the role of this Employee.


        :return: The role of this Employee.
        :rtype: str
        """
        return self._role

    @role.setter
    def role(self, role: str):
        """Sets the role of this Employee.


        :param role: The role of this Employee.
        :type role: str
        """
        allowed_values = ["Manager", "Accountant", "Executive", "Director"]  # noqa: E501
        if role not in allowed_values:
            raise ValueError(
                "Invalid value for `role` ({0}), must be one of {1}"
                .format(role, allowed_values)
            )

        self._role = role

    @property
    def branch(self) -> str:
        """Gets the branch of this Employee.


        :return: The branch of this Employee.
        :rtype: str
        """
        return self._branch

    @branch.setter
    def branch(self, branch: str):
        """Sets the branch of this Employee.


        :param branch: The branch of this Employee.
        :type branch: str
        """

        self._branch = branch

    @property
    def username(self) -> str:
        """Gets the username of this Employee.


        :return: The username of this Employee.
        :rtype: str
        """
        return self._username

    @username.setter
    def username(self, username: str):
        """Sets the username of this Employee.


        :param username: The username of this Employee.
        :type username: str
        """

        self._username = username

    @property
    def password(self) -> str:
        """Gets the password of this Employee.


        :return: The password of this Employee.
        :rtype: str
        """
        return self._password

    @password.setter
    def password(self, password: str):
        """Sets the password of this Employee.


        :param password: The password of this Employee.
        :type password: str
        """

        self._password = password

    @property
    def phone_number(self) -> str:
        """Gets the phone_number of this Employee.


        :return: The phone_number of this Employee.
        :rtype: str
        """
        return self._phone_number

    @phone_number.setter
    def phone_number(self, phone_number: str):
        """Sets the phone_number of this Employee.


        :param phone_number: The phone_number of this Employee.
        :type phone_number: str
        """

        self._phone_number = phone_number
