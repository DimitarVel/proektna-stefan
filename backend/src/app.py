from flask import Flask, request
from FlaskSQL import *

fsql = flaskSQL(Flask(__name__))
fsql.connect('root', '', '127.0.0.1', 'blogger')
app = fsql.get_app()

@app.route("/api/register", methods=["POST", "GET"])
def register():
    if not request.method == "POST":
        return jsonify({
            "error_message" : "Bad request.",
            "error_code" : "400"
        })

    data = request.params
    existing_user = fsql.read("""SELECT * FROM users WHERE username = %s""", (str(data['username']), ))
    print("#####", existing_user)
    if len(existing_user) != 0:
        return jsonify({
            "error_code" : "409",
            "error_message" : "Username already in use."
        })

    fsql.create("""INSERT INTO users (username, password) VALUES (%s, %s)""", (data["username"], data["password"]))

    user = fsql.read("""SELECT * FROM users WHERE username = %s AND password = %s""", (data["username"], data["password"]), 0)

    return jsonify({
        "user" : user,
        "error_message" : "Success",
        "error_code" : "200"
    })

@app.route("/api/login", methods=["POST", "GET"])
def login():
    if not request.method == "POST":
        return jsonify({
            "error_message" : "Bad Request",
            "error_code" : "400"
        })

    data = request.params

    user = fsql.read("""SELECT * FROM users WHERE username = %s AND password = %s""", (data["username"], data["password"]), 0)

    if not isinstance(user, dict):
        return jsonify({
            "error_message" : "Username or Password is incorrect. Please try again.",
            "error_code" : "404"
        })

    return jsonify({
        "user" : user,
        "error_message" : "Success",
        "error_code" : "200"
    })

@app.route("/api/create_post", methods=["POST", "GET"])
def create_post():
    if not request.method == "POST":
        return jsonify({
            "error_message" : "Bad Request",
            "error_code" : "400"
        })

    data = request.params

    fsql.create("""INSERT INTO posts (creator_id, post_title, post_body) VALUES (%s, %s, %s)""", 
        (data["user"]["user_id"], data["post"]["post_title"], data["post"]["post_body"])
    )

    return jsonify({
        "error_message" : "Success",
        "error_code" : "200"
    })

@app.route("/api/get_post", methods=["POST", "GET"])
def get_post():
    if not request.method == "GET":
        return jsonify({
            "error_message" : "Bad Request",
            "error_code" : "400"
        })
    post_id = request.args.get('post_id')

    post = fsql.read("""SELECT * FROM posts WHERE post_id = %s""", (str(post_id)), 0)

    return jsonify({
        "post" : post,
        "error_message" : "Success",
        "error_code" : "200"
    })

@app.route("/api/get_all_posts", methods=["POST", "GET"])
def get_all_posts():
    if not request.method == "GET":
        return jsonify({
            "error_message" : "Bad Request",
            "error_code" : "400"
        })

    posts = fsql.read("""SELECT * FROM posts""", ())

    return jsonify({
        "posts" : posts,
        "error_message" : "Success",
        "error_code" : "200"
    })

app.run(debug=True)
