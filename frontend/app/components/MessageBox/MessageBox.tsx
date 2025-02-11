import styles from './MessageBox.module.css';
import { MessageData } from '../../types';

export default function Message({
    content,
    sender,
    timestamp,
    isOwnMessage
}: MessageData) {
    return (
        <div className={`${styles.messageContainer} ${isOwnMessage ? styles.messageContainerOwn : styles.messageContainerOther}`}>
            <div className={`${styles.messageBox} ${isOwnMessage ? styles.messageBoxOwn : styles.messageBoxOther}`}>
                <h4 className={styles.messageAuthor}>{isOwnMessage ? 'Você' : 'Sistema'}</h4>
                <p>{content}</p>
            </div>
        </div>
    );
}