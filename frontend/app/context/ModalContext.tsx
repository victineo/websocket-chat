'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import OverlayContainer from '../components/OverlayContainer/OverlayContainer';

interface ModalContextType {
    modalContent: ReactNode | null;
    showModal: (content: ReactNode) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const showModal = (content: ReactNode) => setModalContent(content);
    const hideModal = () => setModalContent(null);

    return (
        <ModalContext.Provider value={{ modalContent, showModal, hideModal }}>
            {children}
            {modalContent && <OverlayContainer onClose={hideModal}>{modalContent}</OverlayContainer>}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
