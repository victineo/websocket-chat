import styles from './MessageBox.module.css';

interface MessageProps {
    message: string;
    isOwnMessage: boolean;
}

export default function Message({ message, isOwnMessage }: MessageProps) {
    return (
        <div className={`${styles.messageContainer} ${isOwnMessage ? styles.messageContainerOwn : styles.messageContainerOther}`}>
            <div className={`${styles.messageBox} ${isOwnMessage ? styles.messageBoxOwn : styles.messageBoxOther}`}>
                <h4 className={styles.messageAuthor}>{isOwnMessage ? 'Você' : 'Sistema'}</h4>
                <p>{message}</p>
            </div>
        </div>
    );
}