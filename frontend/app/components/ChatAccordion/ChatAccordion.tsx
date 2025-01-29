import styles from './ChatAccordion.module.css';

import ChatListItemButton from '../ChatListItemButton/ChatListItemButton';

interface ChatAccordionProps {
    title: string;
    chats: string[];
    onChatClick: (chatName: string) => void;
}

export default function ChatAccordion({ title, chats, onChatClick }: ChatAccordionProps) {
    if (chats.length === 0) return null;
    
    return (
        <div className={styles.chatAccordion}>
            <h2>{title}</h2>
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