from database import db
import uuid

class Space(db.Model):
    __tablename__ = 'spaces'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    context_profile_id = db.Column(db.String(36), db.ForeignKey('context_profiles.id'), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'context_profile_id': self.context_profile_id
        }
