'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './home.module.css';

import Aside from '../components/Aside/Aside';
import Welcome from '../components/Welcome/Welcome';
import Chat from '../components/Chat/Chat';
import { MessageData, ChatData } from '../types';

export default function Home() {
    const [socket, setSocket] = useState<Socket | null>(null);

    const [activeSection, setActiveSection] = useState('home');

    const [chats, setChats] = useState<ChatData[]>([]);

    const [activeChat, setActiveChat] = useState<ChatData>();

    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');

            newSocket.emit('get_initial_chats');
            console.log(`Solicitando chats para o backend...`);
        });

        newSocket.on('initial_chats', (initialChats: ChatData[]) => {
            console.log(`Solicitação de chats enviada para o backend!`);

            if (!initialChats || initialChats.length === 0) {
                console.log('Nenhum chat recebido do backend.');
                return;
            }

            setChats(initialChats);
        });

        newSocket.on('new_initial_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_initial_message'!`);
            if (activeSection === 'home') {
                const newChat: ChatData = {
                    id: data.chat_id,
                    name: data.chat_name,
                    messages: [
                        {
                            content: data.message.content,
                            sender: data.message.sender,
                            timestamp: data.message.timestamp,
                            isOwnMessage: data.message.sender === socket?.id
                        }
                    ]
                }

                setActiveSection('chat');
                setChats((prevChats) => [...prevChats, newChat]);
                setActiveChat(newChat);
                setMessages(newChat.messages);
                console.log(`Estrutura completa do novo chat criado:\n${JSON.stringify(newChat, null, 2)}`);
            }
        });

        newSocket.on('new_chat_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_chat_message'!`);
            console.log(`Estrutura completa do chat ativo NO ESTADO: ${JSON.stringify(activeChat, null, 2)}`);
            console.log(`Estrutura completa das mensagens NO ESTADO: ${JSON.stringify(messages, null, 2)}`);
            
            const message: MessageData = {
                content: data.message.content,
                sender: data.message.sender,
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
            console.log(`Estrutura completa do chat ativo atualizada NO ESTADO:\n${JSON.stringify(activeChat, null, 2)}\nID: ${activeChat?.id}\nNome: ${activeChat?.name}`);

            console.log(`Mensagem recebida de ${message.sender}: ${message.content}`);
        });

        newSocket.on('new_system_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_system_message'!`);
            
            const message: MessageData = {
                content: data.message.content,
                sender: data.message.sender,
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

            console.log(`Mensagem do sistema integrada ao chat: ${message.content}`);
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
            console.log(`Estrutura completa do chat ativo: ${JSON.stringify(activeChat, null, 2)}`);
            socket.emit('chat_message', {
                chat_id: activeChat.id,
                message: message
            });
        }
    };

    function handleChatSelect(chat: ChatData) {
        if (activeSection !== 'chat') {
            setActiveSection('chat');
        }

        setActiveChat(chat);
        console.log(`Estrutura completa do chat selecionado: ${JSON.stringify(chat, null, 2)}`);
        setMessages(chat.messages);
    }

    return (
        <div className={styles.pageContainer}>
            <Aside
                setActiveSection={setActiveSection}
                chats={chats}
                onChatSelect={handleChatSelect}
            />
            <div className={styles.midColumn}>
                {activeSection === 'home' && (
                    <Welcome
                        onSendMessage={handleSendInitialMessage}
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