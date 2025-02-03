from tinydb import TinyDB, Query
from pathlib import Path
import os

# Configuração de diretórios
BASE_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = BASE_DIR / 'data'
DATA_DIR.mkdir(exist_ok=True)

# Configuração do banco de dados
DB_PATH = DATA_DIR / 'db.json'

# Inicialização do banco de dados
db = TinyDB(DB_PATH)

# Tabelas
users_table = db.table('users')
chats_table = db.table('chats')
messages_table = db.table('messages')