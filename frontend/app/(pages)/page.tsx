'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './home.module.css';

import Aside from '../components/Aside/Aside';
import Welcome from '../components/Welcome/Welcome';
import Chat from '../components/Chat/Chat';
import Spaces from '../components/Spaces/Spaces';
import { MessageData, ChatData } from '../types';

export default function Home() {
    const [socket, setSocket] = useState<Socket | null>(null);

    const [activeSection, setActiveSection] = useState('home');

    const [chats, setChats] = useState<ChatData[]>([]);

    const [activeChat, setActiveChat] = useState<ChatData>();

    const [activeMessages, setActiveMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        console.log(`Estado atualizado de chats:`, chats);
    }, [chats]);

    useEffect(() => {
        console.log(`Estado atualizado de activeChat:`, activeChat);
    }, [activeChat]);
    
    useEffect(() => {
        console.log(`Estado atualizado de activeMessages:`, activeMessages);
    }, [activeMessages]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('connect', () => {
            console.log(`Conectado ao servidor com o ID: ${newSocket.id}`);

            setSocket(newSocket);

            newSocket.emit('get_initial_chats');
            console.log(`Solicitando chats para o backend...`);
        });

        newSocket.on('initial_chats', (initialChats: ChatData[]) => {
            console.log(`Solicitação de chats enviada para o backend!`);

            if (!initialChats || initialChats.length === 0) {
                console.log('Nenhum chat recebido do backend.');
                return;
            }

            console.log(`Chats recebidos do backend:`, initialChats);

            setChats(initialChats);
        });

        newSocket.on('new_initial_message', (data: any) => {
            console.log(`O backend acionou o evento 'new_initial_message'!`);

            if (activeSection === 'home') {
                const newChat: ChatData = {
                    id: data.id,
                    user_id: data.user_id,
                    space_id: data.space_id,
                    name: data.name,
                    context_profile_id: data.context_profile_id
                };

                const newMessage: MessageData = {
                    id: data.messages[0].id,
                    chat_id: data.messages[0].chat_id,
                    sender_id: data.messages[0].sender_id,
                    content: data.messages[0].content,
                    timestamp: data.messages[0].timestamp,
                    isOwnMessage: data.messages[0].sender_id === socket?.id
                }

                console.log(`Metadados do Chat recebido:\n${JSON.stringify(newChat, null, 2)}`);
                console.log(`Metadados da Mensagem recebida:\n${JSON.stringify(newMessage, null, 2)}`);

                setActiveSection('chat');
                setChats((prevChats) => [...prevChats, newChat]);
                setActiveChat(() => newChat);
                setActiveMessages((prevMessages) => [...prevMessages, newMessage]);
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
        });

        newSocket.on('chat_messages', (data: MessageData[]) => {
            console.log(`O backend acionou o evento 'chat_messages'!`);
            
            const messages: MessageData[] = data.map((message: MessageData) => ({
                id: message.id,
                chat_id: message.chat_id,
                sender_id: message.sender_id,
                content: message.content,
                timestamp: message.timestamp,
                isOwnMessage: message.sender_id === socket?.id
            }));

            setActiveMessages(() => messages);
        })

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

        if (activeChat?.id === chat.id) {
            console.log(`O chat ${chat.id} já está selecionado.`);
            return;
        }

        setActiveChat(chat);
        setActiveMessages([]); // Limpa as mensagens para evitar exibir mensagens do chat errado temporariamente
        console.log(`Estrutura do chat selecionado:`, chat);

        if (socket) {
            socket.emit('get_chat_messages', chat.id);
        }
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
                {activeSection === 'spaces' && (
                    <Spaces />
                )}
            </div>
        </div>
    );
}
