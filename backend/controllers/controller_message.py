from models import Message
from database import db
from datetime import datetime, timezone

class MessageController:
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
    def get_chat_messages(chat_id):
        messages = db.session.query(Message).filter_by(chat_id=chat_id).all()
        return [message.to_dict() for message in messages]
