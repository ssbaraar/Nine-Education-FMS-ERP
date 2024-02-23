import connexion
import six

from swagger_server.models import (DbGetRequest, DbUpdateRequest)
from swagger_server.models.error import Error  # noqa: E501
from swagger_server import util
from swagger_server.__main__ import mongo
from loguru import logger
import pandas as pd
from flask import send_file
from io import BytesIO

def db_get(body):  # noqa: E501
    """Get data from database

    Get data from database # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: object
    """
    if connexion.request.is_json:
        logger.info("db_get")
        body = DbGetRequest.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            if body.type == 'findOne':
                data = mongo.db[body.collection_name].find_one(
                    body.query,
                    {
                        '_id': 0
                    }
                )
                logger.info(data)
            elif body.type == 'findMany':
                data = list(mongo.db[body.collection_name].find(
                    body.query,
                    {
                        '_id': 0
                    }
                ))
                logger.info(data)
        
            return data
        except Exception as e:
            logger.error(e)
            return Error(
                message="Internal server error")


def get_excel(body):  # noqa: E501
    """Get excel file

    Get excel file # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: object
    """
    if connexion.request.is_json:
        body = DbGetRequest.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            data = list(mongo.db[body.collection_name].find(
                body.query,
                {
                    '_id': 0
                }
            ))
            df = pd.DataFrame(data)
            excel_file = BytesIO()
            df.to_excel(excel_file, index=False)
            excel_file.seek(0)

            return send_file(
                excel_file,
                as_attachment=True,
                download_name=f"{body.collection_name}.xlsx",  # Fix here
                mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
        except Exception as e:
            logger.error(e)
            return Error(
                message="Internal server error")



def db_update(body):  # noqa: E501
    """Update data in database

    Update data in database # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DbUpdateRequest.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            if body.type == 'updateOne':
                mongo.db[body.collection_name].update_one(
                    body.query,
                    {
                        '$set': body.update
                    }
                )          
                updated_data = mongo.db[body.collection_name].find_one(
                    body.query,
                    {
                        '_id': 0
                    }
                )
                logger.info(updated_data)
            elif body.type == 'updateMany':
                mongo.db[body.collection_name].update_many(
                    body.query,
                    {
                        '$set': body.update
                    }
                )
                
                updated_data = list(mongo.db[body.collection_name].find(
                    body.query,
                    {
                        '_id': 0
                    }
                ))
                logger.info(updated_data)
            return updated_data
        # Add an except block here to handle exceptions
        except Exception as e:
            logger.error(e)
            return Error(
                message="Internal server error")
