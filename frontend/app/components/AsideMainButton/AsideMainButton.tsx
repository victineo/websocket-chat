import styles from './AsideMainButton.module.css';

export default function AsideMainButton({
    icon,
    label,
    title,
    isCollapsed,
    ...props
}: {
    icon: React.ReactNode;
    label: string;
    title?: string;
    isCollapsed: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={styles.asideMainButton}
            title={title}
            {...props}
        >
            <div className={`${styles.asideMainButtonStateLayer} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
                {icon}
                <span className={styles.asideMainButtonLabel}>
                    {isCollapsed ? '' : label}
                </span>
            </div>
        </button>
    );
}