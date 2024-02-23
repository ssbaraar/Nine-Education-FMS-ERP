import connexion
import six

from swagger_server.models.branch import Branch  # noqa: E501
from swagger_server.models import Response
from swagger_server.models.error import Error  # noqa: E501
from swagger_server import util
from swagger_server.__main__ import mongo
from loguru import logger


def branches_post(body):  # noqa: E501
    """Create a new branch

    Add a new branch to the system. # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: Branch
    """
    if connexion.request.is_json:
        body = Branch.from_dict(connexion.request.get_json())  # noqa: E501
        logger.info("Creating branch")
        try:
            if mongo.db.branches.find_one(
                {
                    'branchName': body.branch_name
                }
            ):
                return Error(
                    message=f"Branch with branch name {body.branch_name} already exists"
                )
            mongo.db.branches.insert_one(util.snake_to_camel(body.to_dict()))
            
            branch = Branch.from_dict(mongo.db.branches.find_one(
                {
                    'branchName': body.branch_name
                }
            ))
            
            if branch is None:
                return Error(
                    message=f"Branch with branch name {body.branch_name} not created"
                )
                
            return Response(
                message=f"Branch with branch name {body.branch_name} created successfully",
                data=branch
            )
        except Exception as e:
            logger.error(f"Error creating branch: {e}")
            return Error(
                message=f"Error creating branch: {e}"
            )
