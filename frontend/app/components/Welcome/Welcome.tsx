import styles from './Welcome.module.css';
import MessageForm from "../MessageForm/MessageForm";

interface WelcomeProps {
    onSendMessage: (message: string) => void;
}

export default function Welcome({ onSendMessage }: WelcomeProps) {
    const handleSendMessage = (message: string) => {
        onSendMessage(message);
    };

    return (
        <div className={styles.welcomeContainer}>
            <h1>O que vamos fazer hoje?</h1>
            <MessageForm onSendMessage={handleSendMessage} />
        </div>
    );
}