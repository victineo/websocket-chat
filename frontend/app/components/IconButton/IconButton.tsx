import styles from './IconButton.module.css';
import { ReactNode } from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    title?: string;
    size?: 'xs' | 'm';
}

export default function IconButton({
    icon,
    title,
    size = 'm',
    ...props
}: IconButtonProps) {
    return (
        <button
            className={styles.iconButton}
            title={title}
            {...props}
        >
            <div className={`${styles.iconButtonStateLayer} ${styles[`size${size.toUpperCase()}`]}`}>
                {icon}
            </div>
        </button>
    );
}