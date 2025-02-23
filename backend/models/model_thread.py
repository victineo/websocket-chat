from database import db

class Thread(db.Model):
    __tablename__ = 'threads'
    id = db.Column(db.String, primary_key=True)
    chat_id = db.Column(db.String, db.ForeignKey('chats.id'), nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
