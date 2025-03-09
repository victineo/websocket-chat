import styles from './SpaceCard.module.css';

interface SpaceCardProps {
    name: string;
    description?: string;
    chatCount: number;
}

export default function SpaceCard({
    name,
    description,
    chatCount,
}: SpaceCardProps) {
    return (
        <div className={styles.spaceCardContainer}>
            <div className={styles.spaceCardStateLayer}>
                <div className={styles.spaceCardTextInfo}>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
                <div className={styles.spaceCardMetaData}>
                    <span>{chatCount}/3 chats</span>
                </div>
            </div>
        </div>
    );
}
