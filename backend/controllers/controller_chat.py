from models.model_chat import ChatModel
from models.model_message import MessageModel
from database import chats_table, messages_table, Query
from flask import request
from datetime import datetime, timezone

class ChatController:
    @staticmethod
    def create_chat(name):
        chat_model = ChatModel(name)
        chat_id = chats_table.insert(chat_model.to_dict())

        return chat_id

        '''
        chat_model = ChatModel(name, participants)

        initial_message = MessageModel(content=initial_content, sender='user')
        chat_model.add_message(initial_message.to_dict())

        bot_response = "Olá! Como posso te ajudar hoje?"

        bot_message = MessageModel(content=bot_response, sender='bot')
        chat_model.add_message(bot_message.to_dict())

        chat_id = chats_table.insert(chat_model.to_dict())

        return chat_id
        '''
    
    @staticmethod
    def get_chat(chat_id):
        chat = chats_table.get(doc_id=chat_id)
        return ChatModel(**chat)
    
    @staticmethod
    def get_chats():
        chats = chats_table.all()
        return [ChatModel(**chat) for chat in chats]
    
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
    