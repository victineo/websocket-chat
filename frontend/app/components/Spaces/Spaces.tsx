import styles from './Spaces.module.css';

import SpaceCard from '../SpaceCard/SpaceCard';
import SpaceCreateCard from '../SpaceCreateCard/SpaceCreateCard';

export default function Spaces() {
    return (
        <div className={styles.spacesContainer}>
            <h1>Meus espaços</h1>
            <div className={styles.spacesCarousel}>
                <SpaceCreateCard />
                <SpaceCard name="SpaceCard" chatCount={1} />
                <SpaceCard name="SpaceCard" description="Descrição do espaço" chatCount={1} />
                <SpaceCard name="SpaceCard" description="Descrição do espaço" chatCount={1} />
                <SpaceCard name="SpaceCard" description="Descrição do espaço" chatCount={1} />
                <SpaceCard name="SpaceCard" description="Descrição do espaço" chatCount={1} />
            </div>
        </div>
    );
}
