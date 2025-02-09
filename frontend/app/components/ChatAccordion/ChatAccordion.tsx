import styles from './ChatAccordion.module.css';

import ChatListItemButton from '../ChatListItemButton/ChatListItemButton';
import { ChatData } from '../../types';

interface ChatAccordionProps {
    title: string;
    chats: ChatData[];
    onChatClick: (chat: ChatData) => void;
}

export default function ChatAccordion({ title, chats, onChatClick }: ChatAccordionProps) {
    if (chats.length === 0) return null;
    
    return (
        <div className={styles.chatAccordion}>
            <h2>{title}</h2>
            <ol>
                {chats.map((chat, index) => (
                    <li key={index}>
                        <ChatListItemButton
                            chat={chat}
                            onClick={() => onChatClick(chat)}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
}