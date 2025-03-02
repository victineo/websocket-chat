from models import Message
from database import db

class MessageController:
    @staticmethod
    def get_chat_messages(chat_id):
        messages = db.session.query(Message).filter_by(chat_id=chat_id).all()
        return [message.to_dict() for message in messages]
