from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit, send
#from flask_cors import CORS

app = Flask(__name__, template_folder='../frontend/templates')
# app.config['SECRET_KEY'] = 'your_secret_key'

#CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

users = {}

'''
@app.route('/')
def index():
    return render_template('index.html')
'''

@socketio.on('connect')
def handle_connect():
    user_id = request.sid
    emit('user_connected', {'user_id': user_id}, broadcast=True)
    print(f'{user_id} se conectou.')

@socketio.on('chat_message')
def handle_message(msg):
    try:
        user_id = request.sid
        message_data = {
            'user_id': user_id,
            'message': msg
        }
        emit('new_message', message_data, broadcast=True)
        print(f'Mensagem recebida de {user_id}: {msg}')
    except Exception as e:
        print(f'Erro ao processar mensagem: {e}')


if __name__ == '__main__':
    socketio.run(app, debug=True)