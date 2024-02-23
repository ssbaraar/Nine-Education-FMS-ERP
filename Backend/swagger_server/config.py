import os
import json
from dotenv import load_dotenv

class Config(object):
    """
    Common configurations
    
    Attrubutes:
        DEBUG: Enable/disable debug mode
        TESTING: Enable/disable testing mode
        MONGO_URI: MongoDB URI

    """

    basedir = os.path.abspath(os.path.dirname(__file__))

    load_dotenv(os.path.join(basedir, '../env', '.env'))
    MONGO_URI = os.environ.get('MONGO_URI')
    BASE_DOMAIN = os.environ.get('BASE_DOMAIN')
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = os.environ.get('MAIL_PORT')
    MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL')
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')