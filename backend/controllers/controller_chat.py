from models.model_chat import ChatModel
from models.model_message import MessageModel
from database import chats_table, messages_table, Query
from flask import request
from datetime import datetime, timezone

class ChatController:
    @staticmethod
    def create_chat():
        '''
        O TinyDB cria seus próprios IDs para documentos, e os dicionários com toda a estrutura dos chats
        passam a ser valores desses IDs. Ou seja, esses IDs NÃO estão presentes nos dicionários dos chats.
        Portanto, quando os chats são encaminhados para o frontend, são encaminhados sem IDs, tornando impossível
        enviar mensagens já que os chats não estão devidamente identificados.

        Para solucionar esse problema, criamos um chat completo, inicialmente com `id=None`, e após o inserirmos
        no banco de dados, usamos o ID de documento gerado pelo TinyDB para atualizar o campo `id` do chat.
        '''
        # 1. Cria um modelo de chat completo, mas sem ID
        chat_name = f'Chat {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M')}'
        chat_model = ChatModel(name=chat_name)

        # 2. Insere o dicionário do modelo no banco de dados e armazena o ID de documento gerado pelo TinyDB
        chat_id = chats_table.insert(chat_model.to_dict())

        # 3. Cria um ID dentro do dicionário do chat usando esse mesmo ID gerado pelo TinyDB, e o atualiza no banco de dados
        chat_model.id = chat_id # CONVERTER PARA STRING
        chats_table.update(chat_model.to_dict(), doc_ids=[chat_id])

        return chat_id
    
    @staticmethod
    def get_chat(chat_id):
        chat = chats_table.get(doc_id=chat_id)
        return ChatModel(**chat)
    
    @staticmethod
    def get_chats():
        chats = chats_table.all()

        # Converte os chats de documentos para dicionários serializáveis
        serializable_chats = []
        for chat in chats:
            chat_dict = dict(chat)
            serializable_chats.append(chat_dict)

        return serializable_chats
    
    @staticmethod
    def add_message(chat_id, content, sender):
        chat = chats_table.get(doc_id=chat_id)

        message = MessageModel(
            content=content,
            sender=sender,
            timestamp=datetime.now(timezone.utc).isoformat()
        )

        if chat:
            chat_model = ChatModel(**chat)
            chat_model.add_message(message.to_dict())

            chats_table.update(chat_model.to_dict(), doc_ids=[chat_id])
            return message.to_dict()
        
        return None
    
    @staticmethod
    def update_chat(chat_id, name, participants):
        chat_model = ChatModel(name, participants)
        chats_table.update(chat_model.to_dict(), Query().id == chat_id)
    
    @staticmethod
    def delete_chat(chat_id):
        chats_table.remove(Query().id == chat_id)
    