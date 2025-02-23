from database import db

class Space(db.Model):
    __tablename__ = 'spaces'
    
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    context_profile_id = db.Column(db.String, db.ForeignKey('context_profiles.id'), nullable=True)
