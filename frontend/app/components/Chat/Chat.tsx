import { Socket } from 'socket.io-client';
import styles from './Chat.module.css';
import Message from '../MessageBox/MessageBox';
import MessageForm from '../MessageForm/MessageForm';

interface MessageData {
    message: string;
    user_id: string;
}

interface ChatProps {
    messages: MessageData[];
    onSendMessage: (message: string) => void;
    socket: Socket | null;
}

export default function Chat({ messages, onSendMessage, socket }: ChatProps) {
    return (
        <div className={styles.scrollContainer}>
            <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        message={msg.message}
                        isOwnMessage={msg.user_id === 'Você' || msg.user_id === socket?.id}
                    />
                ))}
            </div>
            <div className={styles.inputContainer}>
                <MessageForm onSendMessage={onSendMessage} />
            </div>
        </div>
    );
}
