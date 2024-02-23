import connexion
import six
import datetime
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.receipt import Receipt  # noqa: E501
from swagger_server.models.receipt_create_request import ReceiptCreateRequest  # noqa: E501
from swagger_server.models import Response, Student
from swagger_server import util
from swagger_server.__main__ import mongo
from loguru import logger

def receipts_post(body):
    """Create a new receipt

    Add a new receipt to the system. # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: Receipt
    """
    if connexion.request.is_json:
        body = ReceiptCreateRequest.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            logger.info("Creating receipt")
            receipt = Receipt.from_dict(connexion.request.get_json())
            student = Student.from_dict(mongo.db.students.find_one(
                {
                    'applicationNumber': body.application_number
                }
            ))
            type = body.fee_type
            if type == 'firstYearTuitionFee':
                final_amount = student.pending_first_year_tuition_fee - body.amount
                logger.info(f"final_amount: {final_amount}")
                paid_amount = student.paid_first_year_tuition_fee + body.amount
                logger.info(f"paid_amount: {paid_amount}")
                receipt.first_year_tuition_fee_paid = body.amount
                logger.info(f"receipt.first_year_tuition_fee_paid: {receipt.first_year_tuition_fee_paid}")
            elif type == 'secondYearTuitionFee':
                final_amount = student.pending_second_year_tuition_fee - body.amount
                paid_amount = student.paid_second_year_tuition_fee + body.amount
                receipt.second_year_tuition_fee_paid = body.amount
            elif type == 'firstYearHostelFee':
                final_amount = student.pending_first_year_hostel_fee - body.amount
                paid_amount = student.paid_first_year_hostel_fee + body.amount
                receipt.first_year_hostel_fee_paid = body.amount
            elif type == 'secondYearHostelFee':
                final_amount = student.pending_second_year_hostel_fee - body.amount
                paid_amount = student.paid_second_year_hostel_fee + body.amount
                receipt.second_year_hostel_fee_paid = body.amount
            type = type[0].upper() + type[1:]
            logger.info(f"pending{type}")
            mongo.db.students.update_one(
                {'applicationNumber': body.application_number},
                {
                    '$set': {
                        f"pending{type}": final_amount,
                        f"paid{type}": paid_amount,
                    }
                },
            )
            # generating a receipt number
            id_type = f"NINE{student.branch}"
            
            last_sequence = mongo.db.idTypeSequences.find_one(
                {'idType': id_type}
            )
            if not last_sequence:
                mongo.db.idTypeSequences.insert_one(
                    {
                        'idType': id_type,
                        'lastSequence': '000000',
                    }
                )
                last_sequence = mongo.db.idTypeSequences.find_one(
                    {'idType': id_type}
                )
            
            receipt_custom_id = util.generate_receipt_id(
                id_type,
                last_sequence['lastSequence']
            )
            
            mongo.db.idTypeSequences.update_one(
                {'idType': id_type},
                {
                    '$set': {
                        'lastSequence': receipt_custom_id['updatedSequence'],
                    }
                }
            )
            
            student = Student.from_dict(mongo.db.students.find_one(
                {
                    'applicationNumber': body.application_number
                }
            ))
            
            receipt.receipt_number = receipt_custom_id['id']
            receipt.date_of_payment = receipt.date_of_payment
            receipt.date_iso = str(datetime.datetime.now())
            receipt.student_name = student.first_name + ' ' + student.sur_name
            receipt.parent_name = student.parent_name
            receipt.application_number = student.application_number
            receipt.registered_mobile_number = student.primary_contact
            receipt.batch = student.batch
            receipt.date_of_joining = student.date_of_joining
            receipt.batch = student.batch
            receipt.stream = student.course
            receipt.gender = student.gender
            receipt.branch = student.branch
            receipt.residence_type = student.mode_of_residence
            receipt.first_year_tuition_fee_payable = student.first_year_tuition_fee  # noqa: E501
            receipt.first_year_hostel_fee_payable = student.first_year_hostel_fee  # noqa: E501
            receipt.second_year_tuition_fee_payable = student.second_year_tuition_fee  # noqa: E501
            receipt.second_year_hostel_fee_payable = student.second_year_hostel_fee  # noqa: E501
            receipt.first_year_total_tuition_fee_paid = student.paid_first_year_tuition_fee  # noqa: E501
            receipt.first_year_total_hostel_fee_paid = student.paid_first_year_hostel_fee  # noqa: E501
            receipt.second_year_total_tuition_fee_paid = student.paid_second_year_tuition_fee  # noqa: E501
            receipt.second_year_total_hostel_fee_paid = student.paid_second_year_hostel_fee  # noqa: E501
            receipt.first_year_total_tuition_fee_pending = student.pending_first_year_tuition_fee  # noqa: E501
            receipt.first_year_total_hostel_fee_pending = student.pending_first_year_hostel_fee  # noqa: E501
            receipt.second_year_total_tuition_fee_pending = student.pending_second_year_tuition_fee  # noqa: E501
            receipt.second_year_total_hostel_fee_pending = student.pending_second_year_hostel_fee  # noqa: E501
            receipt.mode_of_payment = body.mode_of_payment
            receipt.student_status = student.student_status
            if body.mode_of_payment == 'cheque':
                receipt.cheque_number = body.cheque_number
                
            mongo.db.receipts.insert_one(util.snake_to_camel(receipt.to_dict()))
            receipt_response = Receipt.from_dict(mongo.db.receipts.find_one(
                {'receiptNumber': receipt_custom_id['id']}
            ))
            
            if receipt_response.application_number is None:
                return Error(
                    message=f"Receipt with receipt number {receipt.receipt_number} not created"
                )
            return Response(
                message=f"Receipt with receipt number {receipt.receipt_number} created successfully",
                data=util.snake_to_camel(receipt_response)
            )
        except Exception as e:
            return Error(
                message=f"Error creating receipt: {e}"
            )