import { Ellipsis } from 'lucide-react'
import styles from './ChatListItemButton.module.css';

import IconButton from '../IconButton/IconButton';

interface ChatListItemButtonProps {
    name: string;
    onClick?: () => void;
}

export default function ChatListItemButton({ name, onClick }: ChatListItemButtonProps) {
    return (
        <div className={styles.chatListItemButtonWrapper}>
            <div className={styles.chatListItemButtonStateLayer}>
                <button 
                    className={styles.chatListItemButton}
                    onClick={onClick}
                    title={name}
                >
                    <p>{name}</p>
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