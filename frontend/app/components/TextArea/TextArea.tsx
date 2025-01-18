import styles from './TextArea.module.css';

export default function TextArea(
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
    return (
        <textarea className={styles.textArea} {...props} />
    );
}