from datetime import datetime, timezone
from database import chats_table, messages_table, Query

class ChatModel:
    def __init__(self, name, **kwargs) -> None:
        self.name = name
        self.created_at = ('created_at', datetime.now(timezone.utc).isoformat())
        self.messages = kwargs.get('messages', [])
        self.last_message = kwargs.get('last_message', None)
    
    def add_message(self, message):
        self.messages.append(message)
        self.last_message = message
    
    def to_dict(self):
        return {
            'name': self.name,
            'created_at': self.created_at,
            'messages': self.messages,
            'last_message': self.last_message
        }