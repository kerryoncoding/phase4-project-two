
# Used to create the Flask application.
from flask import Flask
# An Object-Relational Mapping (ORM) library for interacting with databases.
from flask_sqlalchemy import SQLAlchemy
# Represents a collection of Table objects that hold the database schema information.
from sqlalchemy import MetaData
# Provides database migration capabilities for Flask applications.
from flask_migrate import Migrate
# A password hashing library for Flask applications.
from flask_bcrypt import Bcrypt
# Helps in building RESTful APIs with Flask.
from flask_restful import Api
# Enables Cross-Origin Resource Sharing (CORS) for the Flask application.
from flask_cors import CORS
# Loads environment variables from a .env file.
from dotenv import load_dotenv
import os

# Loads environment variables from a .env file into the application's environment.
load_dotenv()

# A dictionary that defines naming conventions for various database objects (e.g., indexes, unique constraints, foreign keys).
naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=naming_convention)

# Creates a Flask application instance.
app = Flask(__name__)
# Sets the secret key for the application, used for session management and other security-related purposes.
app.secret_key = os.getenv("FLASK_SECRET_KEY")
# Configures the database URI for connecting to the database.
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
# Disables Flask-SQLAlchemy modification tracking.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Initializes SQLAlchemy with the Flask application and the defined metadata.
db = SQLAlchemy(app=app, metadata=metadata)
# Initializes database migration with the Flask application and the SQLAlchemy database instance.
migrate = Migrate(app=app, db=db)
# Initializes Bcrypt with the Flask application for password hashing.
bcrypt = Bcrypt(app=app)
#  Initializes Flask-RESTful with the Flask application for building RESTful APIs.
api = Api(app=app)
# Enables Cross-Origin Resource Sharing (CORS) for the Flask application.
CORS(app)


