from database import db
import uuid

class ContextProfile(db.Model):
    __tablename__ = 'context_profiles'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
