from database import db

class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.String, primary_key=True)
    chat_id = db.Column(db.String, db.ForeignKey('chats.id'), nullable=False)
    sender_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.Date, nullable=False)
