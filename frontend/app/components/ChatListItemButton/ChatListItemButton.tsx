import { Ellipsis } from 'lucide-react'
import styles from './ChatListItemButton.module.css';

import IconButton from '../IconButton/IconButton';
import Link from 'next/link';

export default function ChatListItemButton({
    name
}: {
    name: string
}) {
    return (
        <div className={styles.chatListItemButtonWrapper}>
            <div className={styles.chatListItemButtonStateLayer}>
                <Link href="www.google.com" className={styles.chatListItemButton}>
                    <p>{name}</p>
                </Link>
                <IconButton
                    size="xs"
                    icon={<Ellipsis />}
                    title="Mais opções"
                />
            </div>
        </div>
    );
}