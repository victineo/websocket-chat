import { Socket } from 'socket.io-client';
import styles from './Chat.module.css';
import Message from '../MessageBox/MessageBox';
import MessageForm from '../MessageForm/MessageForm';
import { MessageData } from '../../types';

interface ChatProps {
    messages: MessageData[];
    onSendMessage: (message: string) => void;
    socket: Socket | null;
}

export default function Chat({
    messages,
    onSendMessage,
    socket
}: ChatProps) {
    return (
        <div className={styles.chatWrapper}>
            <div className={styles.scrollContainer}>
                <div className={styles.messagesContainer}>
                    {messages.map((msg, index) => (
                        <Message
                        key={index}
                        user_id={msg.user_id}
                        message={msg.message}
                        timestamp={msg.timestamp}
                        isOwnMessage={msg.isOwnMessage || msg.user_id === socket?.id}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <MessageForm onSendMessage={onSendMessage} />
            </div>
        </div>
    );
}