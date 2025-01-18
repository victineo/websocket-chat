import styles from './MessageForm.module.css';
import TextInput from "../TextInput/TextInput";

export default function MessageForm() {
    return (
        <form className={styles.messageFormContainer}>
            <TextInput
                placeholder="Digite uma mensagem"
            />
            <div className={styles.messageFormButtons}>
                <button type="button">Anexar arquivos</button>
                <button type="submit">Enviar</button>
            </div>
        </form>
    );
}