# Thirdparty
from flask import Flask, jsonify
from flask_mysqldb import MySQL
from datetime import timedelta
from flask_cors import CORS
from flask_request_params import bind_request_params


class flaskSQL:
    def __init__(self, app):
        self.app = app
        
        self.app.before_request(bind_request_params)
        
        self.cors = CORS(self.app, resources={r"/api/*": {"origins": "*"}})


    def connect(self, user, password, host, database):
        self.app.config['MYSQL_HOST'] = host
        self.app.config['MYSQL_USER'] = user
        self.app.config['MYSQL_PASSWORD'] = password
        self.app.config['MYSQL_DB'] = database

        self.app.config['MYSQL_UNIX_SOCKET'] = 'TCP'
        self.app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

        self.mysql = MySQL(self.app)


    def get_app(self):
        return self.app


    def create(self, query_string, query_params):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
        except Exception as e:
            return e
        finally:
            cursor.close()


    def read(self, query_string, query_params, fetchall = 1):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
            if fetchall: 
                row = cursor.fetchall()
            else:
                row = cursor.fetchone()
            return row
        except Exception as e:
            return e
        finally:
            cursor.close()


    def update(self, query_string, query_params):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
        except Exception as e:
            return e
        finally:
            cursor.close()


    def delete(self, query_string, query_params):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
        except Exception as e:
            return e
        finally:
            cursor.close()