from flask import Flask, request
from flask_migrate import Migrate
from flask_socketio import SocketIO, emit
from database import db
from models import *
from controllers import *
import random, time

app = Flask(__name__, template_folder='../frontend/templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # isso evita warnings

db.init_app(app)
migrate = Migrate(app, db)

socketio = SocketIO(app, cors_allowed_origins="*")

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
        print(f'Erro ao obter chats: {e}')

@socketio.on('chat_initial_message')
def handle_initial_message(msg):
    try:
        user_id = request.sid

        # 1. Cria um novo chat
        chat_doc_id = ChatController.create_chat(user_id)
        print(f'Novo chat criado: {chat_doc_id}')

        # 2. Adiciona a mensagem inicial ao novo chat
        ChatController.add_message(
            chat_id=chat_doc_id,
            sender_id=user_id,
            content=msg
        )

        # 3. Busca o chat atualizado (agora com a nova mensagem)
        chat = ChatController.get_chat(chat_doc_id).to_dict()
        print(f'Estrutura da tabela Chat:\n{chat}')
        messages = MessageController.get_chat_messages(chat_doc_id)
        chat['messages'] = messages
        print(f'Estrutura da tabela Message:\n{messages}')
        print(f'Estrutura do dicionário de chat a ser enviado para o frontend:\n{chat}')

        # 4. Emite o chat completo para o frontend
        emit('new_initial_message', chat, broadcast=True)
        print(f'Mensagem inicial recebida de {user_id}: {msg}')

        # 5. Envia mensagem automática do sistema
        send_system_message(chat_doc_id)
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
            sender_id=user_id,
            content=str(msg['message'])
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

        #chat_doc_id = int(chat_id)

        # Objeto para ser passado ao controlador
        lorem_message = ChatController.add_message(
            chat_id=chat_id,
            sender_id='system',
            content=random.choice(lorem_messages)
        )

        emit('new_system_message', lorem_message, broadcast=True)
        print(f'Estrutura da mensagem automática enviada:\n{lorem_message}')

        return lorem_message
    except Exception as e:
        print(f'Erro ao enviar mensagem automática: {e}')
        return None

if __name__ == '__main__':
    socketio.run(app, debug=True)
