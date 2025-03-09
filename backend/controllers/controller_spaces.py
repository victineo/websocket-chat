from models import Space
from database import db

class SpaceController:
    @staticmethod
    def create_space(user_id, name, description=None, instructions=None, context_profile_id=None):
        space = Space(name=name, user_id=user_id, description=description, instructions=instructions, context_profile_id=context_profile_id)
        db.session.add(space)
        db.session.commit()
        return space.id
    
    @staticmethod
    def get_spaces():
        spaces = db.session.query(Space).all()
        return [space.to_dict() for space in spaces]
    
    @staticmethod
    def update_space(space_id, name, description=None, instructions=None, context_profile_id=None):
        space = db.session.query(Space).filter_by(id=space_id).first()
        if space:
            space.name = name
            space.description = description
            space.instructions = instructions
            space.context_profile_id = context_profile_id
            db.session.commit()
            return True
        return False
    
    @staticmethod
    def delete_space(space_id):
        db.session.query(Space).filter_by(id=space_id).delete()
        db.session.commit()
