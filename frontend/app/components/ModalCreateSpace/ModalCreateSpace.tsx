import styles from './ModalCreateSpace.module.css';
import IconButton from '../IconButton/IconButton';
import TextArea from '../TextArea/TextArea';
import TextInput from '../TextInput/TextInput';
import { X } from 'lucide-react';

export default function ModalCreateSpace({ closeModal }: { closeModal: () => void }) {
    return (
        <div className={styles.modalCreateSpaceContainer}>
            <div className={styles.modalHeader}>
                <h2>Criar Espaço</h2>
                <IconButton icon={<X size={24} />} title="Fechar" onClick={closeModal} />
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalInputContainer}>
                    <label htmlFor="name">Nome</label>
                    <TextInput placeholder="Estudos" />
                </div>
                <div className={styles.modalInputContainer}>
                    <label htmlFor="description">Descrição</label>
                    <TextArea placeholder="Espaço para focar em aprendizagem" />
                </div>
                <div className={styles.modalInputContainer}>
                    <label htmlFor="description">Instruções personalizadas</label>
                    <TextArea placeholder="Sempre responda em listas" />
                </div>
            </div>
            <div className={styles.modalFooter}>
                <button onClick={closeModal}>Cancelar</button>
                <button type="submit">Criar</button>
            </div>
        </div>
    );
}
