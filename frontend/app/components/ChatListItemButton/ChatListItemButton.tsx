import { Ellipsis } from 'lucide-react'
import styles from './ChatListItemButton.module.css';

export default function ChatListItemButton({
    name
}: {
    name: string
}) {
    return (
        <button className={styles.chatListItemButton}>
            <div className={styles.chatListItemButtonStateLayer}>
                <p>{name}</p>
                <Ellipsis size={24} />
            </div>
        </button>
    );
}