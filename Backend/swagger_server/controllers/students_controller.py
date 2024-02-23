import connexion
import six
import datetime
from loguru import logger
from swagger_server.__main__ import mongo
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.student import Student  # noqa: E501
from swagger_server import util
from swagger_server.models import Response


def students_post(body):  # noqa: E501
    """Create a new student

    Add a new student to the system. # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: Student
    """
    if connexion.request.is_json:
        logger.info("Creating student")
        body = Student.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            if mongo.db.students.find_one(
                {
                    'firstName': body.first_name,
                    'surName': body.sur_name,
                    'primaryContact': body.primary_contact,
                    'branch': body.branch,
                }
            ):
                logger.error(f"Student with application number {body.first_name} already exists")
                return Error(
                    message=f"Student with application number {body.first_name} already exists"
                )
            id_type = body.branch + body.batch[:4]
            last_sequence = mongo.db.idTypeSequences.find_one(
                {'idType': id_type}
            )
            if not last_sequence:
                mongo.db.idTypeSequences.insert_one(
                    {
                        'idType': id_type,
                        'lastSequence': '900000',
                    }
                )
                last_sequence = mongo.db.idTypeSequences.find_one(
                    {'idType': id_type}
                )
            
            student_custom_id = util.generate_custom_id(
                id_type,
                last_sequence['lastSequence']
            )
            
            mongo.db.idTypeSequences.update_one(
                {'idType': id_type},
                {
                    '$set': {
                        'lastSequence': student_custom_id['updatedSequence'],
                    }
                }
            )
            
            body.application_number = student_custom_id['id'] 
            mongo.db.students.insert_one((util.snake_to_camel(body.to_dict())))
            create_student_response = Student.from_dict(mongo.db.students.find_one(
                {'applicationNumber': student_custom_id['id']}
            ))
            if create_student_response.application_number == student_custom_id['id']:
                
                logger.info(f"Student created successfully with ID: {student_custom_id['id']}")
                return Response(
                    message=f"Student created successfully with ID: {student_custom_id['id']}",
                    data=util.snake_to_camel(create_student_response.to_dict()),
                )
            
            return Error(
                message='Student creation failed',
            )
        except Exception as e:
            logger.error(f"Error creating student: {e}")
            return Error(
                message='Student creation failed'
            )

