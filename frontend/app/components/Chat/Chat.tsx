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
                        content={msg.content}
                        sender={msg.sender}
                        timestamp={msg.timestamp}
                        isOwnMessage={msg.sender != 'system'} // Anteriormente `msg.sender === socket?.id`
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