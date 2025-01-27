import styles from './AsideMainButton.module.css';

export default function AsideMainButton({
    icon,
    label,
    title
}: {
    icon: React.ReactNode;
    label: string;
    title?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={styles.asideMainButton} title={title}>
            <div className={styles.asideMainButtonStateLayer}>
                {icon}
                {label}
            </div>
        </button>
    );
}