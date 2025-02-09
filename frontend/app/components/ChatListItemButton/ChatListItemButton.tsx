import { Ellipsis } from 'lucide-react'
import styles from './ChatListItemButton.module.css';

import IconButton from '../IconButton/IconButton';
import { ChatData } from '../../types';

interface ChatListItemButtonProps {
    chat: ChatData;
    isActive?: boolean;
    onClick?: () => void;
}

export default function ChatListItemButton({
    chat,
    isActive = false,
    onClick
}: ChatListItemButtonProps) {
    return (
        <div className={styles.chatListItemButtonWrapper}>
            <div className={styles.chatListItemButtonStateLayer}>
                <button 
                    className={styles.chatListItemButton}
                    onClick={onClick}
                    title={chat.name}
                >
                    <p>{chat.name}</p>
                </button>
                <IconButton
                    size="xs"
                    icon={<Ellipsis />}
                    title="Mais opções"
                />
            </div>
        </div>
    );
}