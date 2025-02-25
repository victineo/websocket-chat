from database import db
import uuid

class Chat(db.Model):
    __tablename__ = 'chats'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    space_id = db.Column(db.String(36), db.ForeignKey('spaces.id'), nullable=True)
    name = db.Column(db.String, nullable=False)
    context_profile_id = db.Column(db.String(36), db.ForeignKey('context_profiles.id'), nullable=True)
    #created_at = db.Column(db.Date, nullable=False)
