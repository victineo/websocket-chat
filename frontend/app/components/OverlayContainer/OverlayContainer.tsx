import { ReactNode } from 'react';
import styles from './OverlayContainer.module.css';

interface OverlayContainerProps {
    children: ReactNode;
    onClose: () => void;
}

export default function OverlayContainer({
    children,
    onClose
}: OverlayContainerProps) {
    return (
        <div className={styles.overlayContainer}>
            <div className={styles.overlayContent}>
                {children}
            </div>
        </div>
    );
}
