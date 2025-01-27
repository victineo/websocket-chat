import styles from './IconButton.module.css';

export default function IconButton({ icon, title = '' }) {
    return (
        <button className={styles.iconButton} title={title}>
            <div className={styles.iconButtonStateLayer}>
                {icon}
            </div>
        </button>
    );
}