import styles from './Welcome.module.css';
import MessageForm from "../MessageForm/MessageForm";

interface WelcomeProps {
    onSendMessage: (message: string) => void;
    setActiveSection: (section: string) => void;
    onAddChat?: (chatName: string) => void;
}

export default function Welcome({ onSendMessage, setActiveSection, onAddChat }: WelcomeProps) {
    const handleSendMessage = (message: string) => {
        onSendMessage(message);
        setActiveSection('chat');
        
        if (onAddChat) {
            const chatName = `Chat ${new Date().toLocaleString()}`;
            onAddChat(chatName);
        }
    };

    return (
        <div className={styles.welcomeContainer}>
            <h1>Bem-vindo!</h1>
            <p>Envie uma mensagem para começar o chat.</p>
            <MessageForm onSendMessage={handleSendMessage} />
        </div>
    );
}
