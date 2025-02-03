class MessageModel:
    def __init__(self, content, sender, timestamp):
        self.content = content
        self.sender = sender
        self.timestamp = timestamp
    
    def to_dict(self):
        return {
            'content': self.content,
            'sender': self.sender,
            'timestamp': self.timestamp
        }