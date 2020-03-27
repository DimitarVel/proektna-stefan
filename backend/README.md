# FlaskSQL
An open source python class that makes database connection and queries easier

# Pips
 - Flask==1.1.1
 - Flask-MySQL==1.5.0
 - Flask-MySQLdb==0.2.0
 - mysqlclient==1.4.6
 - PyMySQL==0.9.3
 - Werkzeug==0.16.0
 - flask-cors==3.0.8

# How to use
In order to use this tool, you need to add it to your enviroment folder, and then include it in the python file where you initialize the python application.

# Constructor
Once you make an instance of the class, you need to pass in your Flask app instance inside the FlaskSQL instance like so:

    `
        app = Flask(__name__)
        fsql = FlaskSQL(app)
    `

# Connecting
In order to connect, you need to run the connect method inside of the database class, and pass in the user, password, name and host as parameters

# Getting Connected App Instance
In order to get an instance of app that is connected, just write the following line of code:

    `
        app = fsql.get_app()
    `

# Create Method
To insert data inside the database, you need to use the create method. This method accepts 2 parameters - query_string and query_params. Here is an example of inserting a new user into a users table:

    `
        fsql.create("""INSERT INTO users (user_name, user_password) VALUES (%s, %s)""", ("username", "password"))
    `

# Read Method
To read data from the database, you need to use the read method. This method accepts 3 parameters of which one is optional. Those are query_string, query_params and fetchall. The fetchall parameter is a boolean and by default set to True. If the fetchall flag is set, if there are multiple items in the database that are selected with the same query, they will all be returned as an array, on the other hand if you disable it by passing False or 0 in its place, then only the first item that matches the querry will be selected and returned. Here is an example of getting a user from a users table:


    `
        user = fsql.read("""SELECT * FROM users WHERE user_name=%s AND user_password=%s""", ("username", "password"), 1)
    `

# Update Method
To update data in the database, you need to use the update method. This method accepts 2 parameters - query_string and query_params. Here is an example of updating a user in users table:

    `
        fsql.update("""UPDATE users SET user_password = %s WHERE user_id = %s""", ("new_password", 1))
    `

# Delete Method
To delete data from the database, you need to use the delete method. This method accepts 2 parameter - query_string and query_params. Here is an example of deleting a user from the users table:

    `
        fsql.delete("""DELETE FROM users WHERE user_id = %s""", (1))
    `

# For better examples and a demo using Postman, go to the examples folder.
