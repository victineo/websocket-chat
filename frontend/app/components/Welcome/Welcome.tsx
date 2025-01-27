import styles from './Welcome.module.css';
import MessageForm from "../MessageForm/MessageForm";

interface WelcomeProps {
    onSendMessage: (message: string) => void;
    setActiveSection: (section: string) => void;
}

export default function Welcome({ onSendMessage, setActiveSection }: WelcomeProps) {
    const handleSendMessage = (message: string) => {
        onSendMessage(message);
        setActiveSection('chat');
    };

    return (
        <div className={styles.welcomeContainer}>
            <h1>Bem-vindo!</h1>
            <p>Envie uma mensagem para começar o chat.</p>
            <MessageForm onSendMessage={handleSendMessage} />
        </div>
    );
}
