import connexion
from loguru import logger
from typing import List
from swagger_server.models import LoginRequest, Employee, Response, SendPasswordRequest, SendEmailRequest
from swagger_server.__main__ import mongo, mail
from flask_mail import Message
from swagger_server import util
from swagger_server.config import Config

"""
controller generated to handled auth operation described at:
https://connexion.readthedocs.io/en/latest/security.html
"""


def check_bearerAuth(token):
    return {'test_key': 'test_value'}


def login(body):
    try:
        if connexion.request.is_json:
            body = LoginRequest.from_dict(connexion.request.get_json())  # noqa: E501
            logger.info('Login API has been called ')
            logger.info(f"body: {body}")
            employee = Employee.from_dict(mongo.db.employees.find_one(
                {"username": body.username, "password": body.password}))
            logger.info(f"employee: {employee}")
            if employee.username is None:
                raise Exception("Invalid username or password")

            return Response(
                data={
                    'employeeRole': employee.role,
                    'employeeName': employee.employee_name,
                    'employeeBranch': employee.branch,
                    'employeeUsername': employee.username
                },
                message="Login Successful",
            )
    except Exception as e:
        logger.error(e)
        return Response(
            data={},
            message="Login Failed",
            error=str(e)
        )


def send_password(body):
    try:
        if connexion.request.is_json:
            body = SendPasswordRequest.from_dict(connexion.request.get_json())  # noqa: E501
            logger.info('Send Password API has been called ')
            employee = Employee.from_dict(mongo.db.employees.find_one(
                {"username": body.email}))
            if employee.username is None:
                raise Exception("This email is not registered with us")

            msg = Message(
                subject="Password Recovery",
                sender=Config.MAIL_USERNAME,
                recipients=['passwordrecovery@9ed.in', 'bharathteja@gmail.com'],
                body=f'This is your password for the username: {employee.username} - {employee.password}',   # noqa: E501
            )

            mail.send(msg)
            return Response(
                data={},
                message="Password sent to your email",
            )
    except Exception as e:
        logger.error(e)
        return Response(
            data={},
            message="Password not sent",
            error=str(e)
        )


def send_mail(body):
    try:
        if connexion.request.is_json:
            body = SendEmailRequest.from_dict(connexion.request.get_json())  # noqa: E501
            logger.info('Send Email API has been called ')
            msg = Message(
                subject=body.subject,
                sender=Config.MAIL_USERNAME,
                recipients=['bharathteja@gmail.com','passwordrecovery@9ed.in'],
                body=body.message,
            )

            mail.send(msg)
            return Response(
                data={},
                message="Email sent",
            )
    except Exception as e:
        logger.error(e)
        return Response(
            data={},
            message="Email not sent",
            error=str(e)
        )

            
       