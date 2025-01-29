import styles from './ChatAcordion.module.css';

import ChatListItemButton from '../ChatListItemButton/ChatListItemButton';

export default function ChatAccordion({ chats, onChatClick }: { chats: string[], onChatClick: (chatName: string) => void }) {
    return (
        <div className={styles.chatAccordion}>
            <h2>Conversas</h2>
            <ol>
                {chats.map((chatName, index) => (
                    <li key={index}>
                        <ChatListItemButton
                            name={chatName}
                            onClick={() => onChatClick(chatName)}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
}