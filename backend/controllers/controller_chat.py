from models import Chat, Message
from database import db
from flask import request
from datetime import datetime, timezone

class ChatController:
    @staticmethod
    def create_chat(user_id):
        chat_name = f'Chat {datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M")}'
        chat = Chat(name=chat_name, user_id=user_id)
        db.session.add(chat)
        db.session.commit()
        return chat.id
    
    @staticmethod
    def get_chat(chat_id):
        return db.session.query(Chat).filter_by(id=chat_id).first()
    
    @staticmethod
    def get_chats():
        chats = db.session.query(Chat).all()
        return [chat.to_dict() for chat in chats]
    
    @staticmethod
    def add_message(chat_id, sender_id, content):
        message = Message(
            chat_id=chat_id,
            sender_id=sender_id,
            content=content,
            timestamp=datetime.now(timezone.utc)
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    
    @staticmethod
    def update_chat(chat_id, name):
        chat = db.session.query(Chat).filter_by(id=chat_id).first()
        if chat:
            chat.name = name
            db.session.commit()
    
    @staticmethod
    def delete_chat(chat_id):
        db.session.query(Chat).filter_by(id=chat_id).delete()
        db.session.commit()
