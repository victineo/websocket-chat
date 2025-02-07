'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './home.module.css';

import Aside from '../components/Aside/Aside';
import Welcome from '../components/Welcome/Welcome';
import Chat from '../components/Chat/Chat';

interface MessageData {
    user_id: string;
    message: string;
    timestamp: string;
    isOwnMessage: boolean;
}

export default function Home() {
    const [socket, setSocket] = useState<Socket | null>(null);

    const [activeSection, setActiveSection] = useState('home');

    const [chats, setChats] = useState<string[]>([]);

    const [activeChat, setActiveChat] = useState<{
        id: string;
        name: string;
        messages: MessageData[];
    } | null>(null);
    
    const handleAddChat = (chatName: string) => {
        setChats((prevChats) => [...prevChats, chatName]);
    };

    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');
        });

        newSocket.on('new_initial_message', (data: any) => {
            if (activeSection === 'home') {
                const newChat = {
                    id: data.chat_id,
                    name: data.chat_name,
                    messages: [{
                        user_id: data.message.sender,
                        message: data.message.content,
                        timestamp: data.message.timestamp,
                        isOwnMessage: data.message.sender === socket?.id
                    }]
                }

                setActiveSection('chat');
                setChats((prevChats) => [...prevChats, newChat.name]);
                setActiveChat(newChat);
                setMessages(newChat.messages);
            }
        });

        newSocket.on('new_chat_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_chat_message'!`);
            
            const message: MessageData = {
                user_id: data.message.sender,
                message: data.message.content,
                timestamp: data.message.timestamp,
                isOwnMessage: data.message.sender === socket?.id
            }

            setMessages((prevMessages) => [...prevMessages, message]);

            setActiveChat((prevChat) => {
                if (prevChat) {
                    return {
                        ...prevChat,
                        messages: [...prevChat.messages, message]
                    }
                }
                return prevChat;
            });

            console.log(`Mensagem recebida de ${message.user_id}: ${message.message}`);
        });

        newSocket.on('new_system_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_system_message'!`);
            
            const message: MessageData = {
                user_id: data.message.sender,
                message: data.message.content,
                timestamp: data.message.timestamp,
                isOwnMessage: false
            }

            setMessages((prevMessages) => [...prevMessages, message]);
            setActiveChat((prevChat) => {
                if (prevChat) {
                    return {
                        ...prevChat,
                        messages: [...prevChat.messages, message]
                    }
                }
                return prevChat;
            })

            console.log(`Mensagem do sistema integrada ao chat: ${message.message}`);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    function handleSendInitialMessage(message: string) {
        if (socket) {
            socket.emit('chat_initial_message', message);
        }
    };

    function handleSendChatMessage(message: string) {
        if (socket && activeSection === 'chat' && activeChat) {
            socket.emit('chat_message', {
                chat_id: activeChat.id,
                message: message
            });
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
                        onSendMessage={handleSendInitialMessage}
                        setActiveSection={setActiveSection}
                        onAddChat={handleAddChat}
                    />
                )}
                {activeSection === 'chat' && (
                    <Chat 
                        messages={messages} 
                        onSendMessage={handleSendChatMessage} 
                        socket={socket} 
                    />
                )}
            </div>
        </div>
    );
}