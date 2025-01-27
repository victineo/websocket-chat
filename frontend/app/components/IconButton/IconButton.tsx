import styles from './IconButton.module.css';
import { ReactNode } from 'react';

export default function IconButton({
    icon,
    title
}: {
    icon: ReactNode;
    title?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={styles.iconButton} title={title}>
            <div className={styles.iconButtonStateLayer}>
                {icon}
            </div>
        </button>
    );
}