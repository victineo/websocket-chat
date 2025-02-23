from database import db

class ContextProfile(db.Model):
    __tablename__ = 'context_profiles'
    
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
