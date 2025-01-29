'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './home.module.css';

import Aside from '../components/Aside/Aside';
import Welcome from '../components/Welcome/Welcome';
import Chat from '../components/Chat/Chat';

interface MessageData {
    user_id: string;
    isOwnMessage: boolean;
    message: string;
}

export default function Home() {
    const [activeSection, setActiveSection] = useState('home');
    const [socket, setSocket] = useState<Socket | null>(null);

    const [chats, setChats] = useState<string[]>([]);
    const handleAddChat = (chatName: string) => {
        setChats((prevChats) => [...prevChats, chatName]);
    };

    const [messages, setMessages] = useState<MessageData[]>([]);

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
            <Aside
                setActiveSection={setActiveSection}
                chats={chats}
                onAddChat={handleAddChat}
            />
            <div className={styles.midColumn}>
                {activeSection === 'home' && (
                    <Welcome
                        onSendMessage={handleSendMessage}
                        setActiveSection={setActiveSection}
                        onAddChat={handleAddChat}
                    />
                )}
                {activeSection === 'chat' && (
                    <Chat 
                        messages={messages} 
                        onSendMessage={handleSendMessage} 
                        socket={socket} 
                    />
                )}
            </div>
        </div>
    );
}