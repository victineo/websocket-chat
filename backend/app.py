from flask import Flask, request
from flask_socketio import SocketIO, emit
#from flask_cors import CORS
import random
from controllers.controller_chat import ChatController

app = Flask(__name__, template_folder='../frontend/templates')
# app.config['SECRET_KEY'] = 'your_secret_key'

#CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

users = {}

lorem_messages = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Quo neque non accusamus in maxime corrupti itaque eveniet, vero repellat odio aliquam aliquid exercitationem dolorem.',
    'Blanditiis provident reprehenderit amet porro autem!',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo neque non accusamus in maxime corrupti itaque eveniet, vero repellat odio aliquam aliquid exercitationem dolorem. Blanditiis provident reprehenderit amet porro autem!',
]

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

@socketio.on('chat_initial_message')
def handle_initial_message(msg):
    try:
        user_id = request.sid

        # 1. Cria um novo chat
        chat_id = ChatController.create_chat('Nome do Chat')
        print(f'Novo chat criado: {chat_id}')

        # 2. Adiciona a mensagem inicial ao novo chat
        # Objeto para ser passado ao controlador
        message = ChatController.add_message(
            chat_id=chat_id,
            content=msg,
            sender=user_id
        )

        # 3. Emite a mensagem com dados estruturados
        # Objeto para ser retornado ao frontend
        message_data = {
            'chat_id': chat_id,
            'message': message, # Já inclui content e sender
            'timestamp': message['timestamp']
        }

        emit('new_initial_message', message_data, broadcast=True)
        print(f'Mensagem inicial recebida de {user_id}: {msg}')
    except Exception as e:
        print(f'Erro ao enviar mensagem inicial: {str(e)}')

@socketio.on('chat_message')
def handle_message(msg):
    try:
        user_id = request.sid
        message_data = {
            'user_id': user_id,
            'message': msg
        }
        emit('new_chat_message', message_data, broadcast=True)
        print(f'Mensagem recebida de {user_id}: {msg}')
        
        # Enviar mensagem automática de Lorem Ipsum
        lorem_message_data = {
            'user_id': 'Sistema',
            'message': f'{random.choice(lorem_messages)}'
        }
        emit('new_chat_message', lorem_message_data, broadcast=True)
        print(f'Mensagem automática enviada: {lorem_message_data["message"]}')
    except Exception as e:
        print(f'Erro ao processar mensagem: {e}')


if __name__ == '__main__':
    socketio.run(app, debug=True)