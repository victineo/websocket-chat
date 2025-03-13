import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import styles from './MessageForm.module.css';

import TextArea from "../TextArea/TextArea";
import IconButton from '../IconButton/IconButton';

interface MessageFormProps {
    onSendMessage: (message: string) => void;
}

export default function MessageForm({ onSendMessage }: MessageFormProps) {
    const [messageText, setMessageText] = useState('');
    console.log(messageText); // teste

    function handleMessageTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setMessageText(event.target.value);
    }

    function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!messageText.trim()) return;

        onSendMessage(messageText);
        setMessageText('');
    }

    const isMessageTextEmpty = messageText.length === 0;

    return (
        <form className={styles.messageFormContainer} onSubmit={handleSendMessage}>
            <textarea
                placeholder="Digite uma mensagem"
                value={messageText}
                onChange={handleMessageTextChange}
            />
            <div className={styles.messageFormButtons}>
                <IconButton icon={<Paperclip size={24} />} title="Anexar arquivos" />
                <button type="submit" disabled={isMessageTextEmpty} title="Enviar mensagem">
                    <Send size={24} />
                </button>
            </div>
        </form>
    );
}