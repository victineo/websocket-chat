from database import db

class Chat(db.Model):
    __tablename__ = 'chats'
    
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    space_id = db.Column(db.String, db.ForeignKey('spaces.id'), nullable=True)
    name = db.Column(db.String, nullable=False)
    context_profile_id = db.Column(db.String, db.ForeignKey('context_profiles.id'), nullable=True)
    #created_at = db.Column(db.Date, nullable=False)
