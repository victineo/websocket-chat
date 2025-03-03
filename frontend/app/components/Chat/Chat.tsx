import { Socket } from 'socket.io-client';
import styles from './Chat.module.css';
import MessageBox from '../MessageBox/MessageBox';
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
                        <MessageBox
                            key={index}
                            id={msg.id}
                            chat_id={msg.chat_id}
                            sender_id={msg.sender_id}
                            content={msg.content}
                            timestamp={msg.timestamp}
                            isOwnMessage={msg.sender_id != 'system'} // Anteriormente `msg.sender === socket?.id`
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