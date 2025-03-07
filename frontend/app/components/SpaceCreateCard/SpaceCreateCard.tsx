import styles from './SpaceCreateCard.module.css';

import { Plus } from 'lucide-react';

export default function SpaceCreateCard() {
    return (
        <div className={styles.spaceCreateCard}>
            <div className={styles.spaceCreateCardStateLayer}>
                <div className={styles.spaceCreateCardIconContainer}>
                    <Plus size={24} />
                </div>
                <div className={styles.spaceCreateCardTextInfo}>
                    <h1>Criar um novo espaço</h1>
                    {/* <p>Adicione um nome e uma descrição para o seu espaço</p> */}
                </div>
            </div>
        </div>
    );
}
