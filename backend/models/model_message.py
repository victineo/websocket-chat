from database import db
import uuid

class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    chat_id = db.Column(db.String(36), db.ForeignKey('chats.id'), nullable=False)
    sender_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'chat_id': self.chat_id,
            'sender_id': self.sender_id,
            'content': self.content,
            'timestamp': self.timestamp.strftime("%d/%m/%Y %H:%M")
        }
