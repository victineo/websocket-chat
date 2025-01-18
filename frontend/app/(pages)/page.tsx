'use client'; // Isso é necessário para que o componente seja renderizado apenas no lado do cliente

// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
import styles from './home.module.css';

import Message from '../components/MessageBox/MessageBox';
import MessageForm from '../components/MessageForm/MessageForm';

export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.messagesContainer}>
                <Message message="Olá!" isOwnMessage={false} />
                <Message message="Oi! Tudo bem?" isOwnMessage={true} />
            </div>
            <div className={styles.inputContainer}>
                <MessageForm />
            </div>
        </div>
    );
}