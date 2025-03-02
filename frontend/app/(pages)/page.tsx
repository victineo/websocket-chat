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

    const [activeMessages, setActiveMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('connect', () => {
            console.log('Conectado ao servidor');
            console.log(`newSocket ID: ${newSocket.id}`);

            setSocket((prevSocket) => {
                console.log(`Socket antigo: ${prevSocket?.id}`);
                return newSocket;
            });

            newSocket.emit('get_initial_chats');
            console.log(`Solicitando chats para o backend...`);
        });

        newSocket.on('initial_chats', (initialChats: ChatData[]) => {
            console.log(`Solicitação de chats enviada para o backend!`);

            if (!initialChats || initialChats.length === 0) {
                console.log('Nenhum chat recebido do backend.');
                return;
            }

            console.log(`Chats recebidos do backend: ${initialChats.length}\n${JSON.stringify(initialChats, null, 2)}`);

            setChats(initialChats);
        });

        newSocket.on('new_initial_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_initial_message'!`);
            console.log(`Seção ativa: ${activeSection}`);
            if (activeSection === 'home') {
                const newChat = {
                    id: data.id,
                    user_id: data.user_id,
                    space_id: data.space_id,
                    name: data.name,
                    context_profile_id: data.context_profile_id,
                    messages: data.messages.map((msg: any) => ({
                        id: msg.id,
                        chat_id: msg.chat_id,
                        sender_id: msg.sender_id,
                        content: msg.content,
                        timestamp: msg.timestamp,
                        isOwnMessage: msg.sender_id === socket?.id
                    }))
                };

                setActiveSection('chat');
                setChats((prevChats) => [...prevChats, newChat]);
                setActiveChat(newChat);
                setActiveMessages(newChat.messages);
                console.log(`Estrutura completa do novo chat criado:\n${JSON.stringify(newChat, null, 2)}`);
            }
        });

        newSocket.on('new_chat_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_chat_message'!`);
            console.log(`Estrutura completa do chat ativo NO ESTADO: ${JSON.stringify(activeChat, null, 2)}`);
            console.log(`Estrutura completa das mensagens NO ESTADO: ${JSON.stringify(activeMessages, null, 2)}`);
            
            const message: MessageData = {
                id: data.message.id,
                chat_id: data.message.chat_id,
                sender_id: data.message.sender_id,
                content: data.message.content,
                timestamp: data.message.timestamp,
                isOwnMessage: data.message.sender_id === socket?.id
            }

            setActiveMessages((prevMessages) => [...prevMessages, message]);

            console.log(`Estrutura completa do chat ativo atualizada NO ESTADO:\n${JSON.stringify(activeChat, null, 2)}\nID: ${activeChat?.id}\nNome: ${activeChat?.name}`);

            console.log(`Mensagem recebida de ${message.sender_id}: ${message.content}`);
        });

        newSocket.on('new_system_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_system_message'!`);
            
            const message: MessageData = {
                id: data.id,
                chat_id: data.chat_id,
                sender_id: data.sender_id,
                content: data.content,
                timestamp: data.timestamp,
                isOwnMessage: data.sender_id === socket?.id
            }

            setActiveMessages((prevMessages) => [...prevMessages, message]);

            console.log(`Mensagem do sistema integrada ao chat: ${message.content}`);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    function handleSendInitialMessage(message: string) {
        if (socket) {
            console.log(`${socket.id} enviando mensagem inicial: ${message}`)
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
                        messages={activeMessages}
                        onSendMessage={handleSendChatMessage}
                        socket={socket}
                    />
                )}
            </div>
        </div>
    );
}
