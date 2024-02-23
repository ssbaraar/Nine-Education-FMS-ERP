import connexion
import six

from swagger_server.models.employee import Employee  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server import util
from loguru import logger
from swagger_server.__main__ import mongo
from swagger_server.models import Response


def employees_post(body):  # noqa: E501
    """Create a new employee

    Add a new employee to the system. # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: Employee
    """
    if connexion.request.is_json:
        body = Employee.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            logger.info("Creating employee")
            if mongo.db.employees.find_one(
                {
                    'username': body.username
                }
            ):
                logger.error(f"Employee with employee id {body.username} already exists")
                return Error(
                    message=f"Employee with employee id {body.username} already exists"
                )
                
            mongo.db.employees.insert_one(util.snake_to_camel(body.to_dict()))
            
            employee = Employee.from_dict(mongo.db.employees.find_one(
                {
                    'username': body.username
                }
            ))
            
            if employee is None:
                logger.error(f"Employee with employee id {body.username} not created")
                return Error(
                    message=f"Employee with employee id {body.username} not created"
                )
                
            employee.password = None
            
            return Response(
                message=f"Employee with employee id {body.username} created successfully",
                data=employee
            )
        except Exception as e:
            logger.error(f"Error creating employee: {e}")
            return Error(
                message=f"Error creating employee: {e}"
            )
