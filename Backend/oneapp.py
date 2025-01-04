from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import pooling
import bcrypt
import jwt
import datetime

# Initialize app and middleware
app = Flask(__name__)
CORS(app)

# Configuration
PORT = 5000
JWT_SECRET = 'your_jwt_secret_key'  # Replace with a secure key

# MySQL connection pooling
db_config = {
    'host': 'localhost',
    'user': 'root',  # Replace with your MySQL username
    'password': 'password',  # Replace with your MySQL password
    'database': 'inventory'  # Replace with your database name
}

connection_pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **db_config)

# Utility function to query the database
def query(sql, params=None):
    connection = connection_pool.get_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute(sql, params)
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result

# Routes

# User authentication
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    role = data['role']
    
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        query('INSERT INTO users (username, password_hash, role) VALUES (%s, %s, %s)', (username, hashed_password, role))
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as err:
        return jsonify({'error': 'Error registering user'}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    try:
        users = query('SELECT * FROM users WHERE username = %s', (username,))
        user = users[0] if users else None
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        token = jwt.encode({
            'id': user['id'],
            'role': user['role'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, JWT_SECRET, algorithm='HS256')
        
        return jsonify({'token': token})
    except Exception as err:
        return jsonify({'error': 'Error logging in'}), 500

# Product routes
@app.route('/products', methods=['GET'])
def get_products():
    try:
        products = query('SELECT * FROM products')
        return jsonify(products)
    except Exception as err:
        return jsonify({'error': 'Error fetching products'}), 500

@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data['name']
    category = data['category']
    stock_level = data['stockLevel']
    reorder_point = data['reorderPoint']
    
    try:
        query(
            'INSERT INTO products (name, category, stock_level, reorder_point) VALUES (%s, %s, %s, %s)',
            (name, category, stock_level, reorder_point)
        )
        return jsonify({'message': 'Product added successfully'}), 201
    except Exception as err:
        return jsonify({'error': 'Error adding product'}), 400

# Start the server
if __name__ == '__main__':
    app.run(port=PORT, debug=True)