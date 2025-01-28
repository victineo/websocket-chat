import { Ellipsis } from 'lucide-react'
import styles from './ChatListItemButton.module.css';

import IconButton from '../IconButton/IconButton';

export default function ChatListItemButton({
    name
}: {
    name: string
}) {
    return (
        <button className={styles.chatListItemButton}>
            <div className={styles.chatListItemButtonStateLayer}>
                <p>{name}</p>
                <IconButton
                    size="xs"
                    icon={<Ellipsis />}
                    title="Mais opções"
                />
            </div>
        </button>
    );
}