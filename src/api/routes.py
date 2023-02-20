"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def create_token(): 
    if request.method == 'POST': 
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email : 
            return jsonify({'error': 'email is required'}), 400
        if not password :
            return jsonify({'error': 'password is required'}), 400
        
        user = User.query.filter_by(email=email).first()
        if not user : 
            return jsonify({'error': 'email/password is incorrect'}), 401
        if not check_password_hash(user.password, password) : 
            return jsonify({'error': 'password is incorrect'}), 401
        # create token
        expiration = datetime.timedelta(days =3)
        access_token = create_access_token(identity = user.id, expires_delta = expiration)
        return jsonify(access_token= access_token)
    return jsonify(msg = "wrong user") 

@api.route('/createUser', methods = ['POST'])
def createUser(): 
    if request.method == 'POST':
        request_body = request.get_json()
        if not request_body['name'] :
            return jsonify({'error': 'name is required'}), 400

        if not request_body['email'] :
            return jsonify({'error': 'email is required'}), 400   
        
        if not request_body['password'] :
            return jsonify({'error': 'password is required'}), 400

        user = User.query.filter_by(email = request_body['email']).first()
        if user : 
            return jsonify({"msg" : "email already exists"}), 400
        user = User(
            name = request_body['name'],
            email = request_body['email'],
            password = generate_password_hash(request_body['password'])
        )
        db.session.add(user) 
        db.session.commit()
        return jsonify({"created" : "thanks, your registration was successful!", "status" : "true"}), 200
    

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200