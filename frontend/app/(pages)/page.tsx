'use client'; // Isso é necessário para que o componente seja renderizado apenas no lado do cliente

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './home.module.css';

import Message from '../components/MessageBox/MessageBox';
import MessageForm from '../components/MessageForm/MessageForm';

interface MessageData {
    user_id: string;
    isOwnMessage: boolean;
    message: string;
}

export default function Home() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([
        {
            user_id: 'Outro usuário',
            isOwnMessage: false,
            message: 'Olá, e bem-vindo ao chat em tempo real com WebSockets!',
        },
        {
            user_id: 'Você',
            isOwnMessage: true,
            message: 'Olá! Tudo bem?',
        },
        {
            user_id: 'Outro usuário',
            isOwnMessage: false,
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo neque non accusamus in maxime corrupti itaque eveniet, vero repellat odio aliquam aliquid exercitationem dolorem. Blanditiis provident reprehenderit amet porro autem!',
        },
    ]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');
        });

        newSocket.on('new_message', (message: MessageData) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    function handleSendMessage(message: string) {
        if (socket) {
            socket.emit('chat_message', message);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.messagesContainer}>
                {/* <Message message="Olá!" isOwnMessage={false} />
                <Message message="Oi! Tudo bem?" isOwnMessage={true} />
                <Message message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo neque non accusamus in maxime corrupti itaque eveniet, vero repellat odio aliquam aliquid exercitationem dolorem. Blanditiis provident reprehenderit amet porro autem!" isOwnMessage={false} />
                <Message message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo neque non accusamus in maxime corrupti itaque eveniet, vero repellat odio aliquam aliquid exercitationem dolorem. Blanditiis provident reprehenderit amet porro autem!" isOwnMessage={true} /> */}
                {messages.map((msg, index) => (
                    <Message
                      key={index}
                      message={msg.message}
                      isOwnMessage={msg.user_id === 'Você' || msg.user_id === socket?.id}
                    />
                ))}
                
            </div>
            <div className={styles.inputContainer}>
                <MessageForm onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}