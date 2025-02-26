from database import db
import uuid

class Thread(db.Model):
    __tablename__ = 'threads'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    chat_id = db.Column(db.String(36), db.ForeignKey('chats.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'chat_id': self.chat_id,
            'user_id': self.user_id,
            'name': self.name
        }
