#!/usr/bin/env python3

import connexion
from flask_pymongo import PyMongo
from swagger_server.config import Config
from flask_cors import CORS
from flask_mail import Mail
from loguru import logger

from swagger_server import encoder

app = connexion.App(__name__, specification_dir='./swagger/')
app.app.json_encoder = encoder.JSONEncoder
app.app.config.from_object(Config)
logger.add('logging.log', rotation="500 MB", level="DEBUG")
mongo = PyMongo(app.app)
CORS(app.app, resources={r"/*": {"origins": Config.BASE_DOMAIN}})
mail = Mail(app.app)

def main():
 
    app.add_api('swagger.yaml', arguments={'title': 'School Management System API'}, pythonic_params=True)
    app.run(port=5000, debug=True)


if __name__ == '__main__':
    main()
