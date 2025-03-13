import styles from './SpaceCreateCard.module.css';
import { Plus } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import ModalCreateSpace from '../ModalCreateSpace/ModalCreateSpace';

export default function SpaceCreateCard() {
    const { showModal, hideModal } = useModal();

    function handleOpenModal() {
        showModal(<ModalCreateSpace closeModal={hideModal} />);
    }

    return (
        <div className={styles.spaceCreateCard} onClick={handleOpenModal}>
            <div className={styles.spaceCreateCardStateLayer}>
                <div className={styles.spaceCreateCardIconContainer}>
                    <Plus size={24} />
                </div>
                <div className={styles.spaceCreateCardTextInfo}>
                    <h1>Criar um novo espaço</h1>
                </div>
            </div>
        </div>
    );
}
