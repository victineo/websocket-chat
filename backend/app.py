from flask import Flask, request
from flask_socketio import SocketIO, emit
#from flask_cors import CORS
import random
import time
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

@socketio.on('get_initial_chats')
def handle_get_initial_chats():
    try:
        user_id = request.sid
        chats = ChatController.get_chats()

        emit('initial_chats', chats, broadcast=True)
        print(f'Chats iniciais solicitados por {user_id}')
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f'Erro ao obter chats: {e}')

@socketio.on('chat_initial_message')
def handle_initial_message(msg):
    try:
        user_id = request.sid

        # 1. Cria um novo chat
        chat_id = ChatController.create_chat()
        print(f'Novo chat criado: {chat_id}')

        chat = ChatController.get_chat(chat_id=chat_id)
        chat_name = chat.name

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
            'chat_name': chat_name,
            'message': message, # Já inclui content e sender
            'timestamp': message['timestamp']
        }
        emit('new_initial_message', message_data, broadcast=True)
        print(f'Mensagem inicial recebida de {user_id}: {msg}')

        # 4. Envia mensagem automática do sistema
        send_system_message(chat_id)
    except Exception as e:
        print(f'Erro ao enviar mensagem inicial: {str(e)}')

@socketio.on('chat_message')
def handle_chat_message(msg):
    try:
        user_id = request.sid
        chat_id = msg.get('chat_id')

        if not chat_id:
            raise ValueError('Chat ID não fornecido')

        # 1. Adiciona a mensagem ao chat
        # Objeto para ser passado ao controlador
        message = ChatController.add_message(
            chat_id=chat_id,
            content=str(msg['message']),
            sender=user_id
        )

        # 2. Emite a mensagem com dados estruturados
        # Objeto para ser retornado ao frontend
        message_data = {
            'chat_id': chat_id,
            'message': message, # Já inclui content e sender
            'timestamp': message['timestamp']
        }
        emit('new_chat_message', message_data, broadcast=True)
        print(f'Mensagem recebida de {user_id}: {msg}')

        # 3. Envia mensagem automática de Lorem Ipsum
        send_system_message(chat_id)
    except Exception as e:
        print(f'Erro ao processar mensagem: {e}')

def send_system_message(chat_id):
    try:
        time.sleep(0.5) # Aguarda 0.5 segundos antes de enviar a mensagem automática

        # Objeto para ser passado ao controlador
        lorem_message = ChatController.add_message(
            chat_id=chat_id,
            content=random.choice(lorem_messages),
            sender='system'
        )

        # Objeto para ser retornado ao frontend
        lorem_message_data = {
            'chat_id': chat_id,
            'message': lorem_message, # Já inclui content e sender
            'timestamp': lorem_message['timestamp']
        }
        emit('new_system_message', lorem_message_data, broadcast=True)
        print(f'Mensagem automática enviada: {lorem_message_data["message"]["content"]}')

        return lorem_message_data
    except Exception as e:
        print(f'Erro ao enviar mensagem automática: {e}')
        return None


if __name__ == '__main__':
    socketio.run(app, debug=True)