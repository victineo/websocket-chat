import styles from './IconButton.module.css';
import { ReactNode } from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    title?: string;
}

export default function IconButton({
    icon,
    title
}: IconButtonProps) {
    return (
        <button
            className={styles.iconButton}
            title={title}
        >
            <div className={`${styles.iconButtonStateLayer}`}>
                {icon}
            </div>
        </button>
    );
}