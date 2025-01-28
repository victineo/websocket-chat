import { useState, Dispatch, SetStateAction } from 'react';
import { ArrowLeftFromLine, ArrowRightFromLine, Home, LayoutGrid } from 'lucide-react';
import styles from './Aside.module.css';

import IconButton from '../IconButton/IconButton';
import AsideMainButton from '../AsideMainButton/AsideMainButton';
import ChatListItemButton from '../ChatListItemButton/ChatListItemButton';

interface AsideProps {
    setActiveSection: Dispatch<SetStateAction<string>>;
}

export default function Aside({ setActiveSection }: AsideProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${styles.aside} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
            <div className={styles.widthButton}>
                <IconButton
                    icon={isCollapsed ? <ArrowRightFromLine /> : <ArrowLeftFromLine />}
                    title={isCollapsed ? "Expandir menu" : "Recolher menu"}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />
            </div>
            <div className={styles.asideMainButtons}>
                <AsideMainButton
                    icon={<Home />}
                    label="Início"
                    title="Início"
                    onClick={() => setActiveSection('home')}
                    isCollapsed={isCollapsed}
                />
                <AsideMainButton
                    icon={<LayoutGrid />}
                    label="Espaços"
                    title="Espaços"
                    onClick={() => setActiveSection('spaces')}
                    isCollapsed={isCollapsed}
                />
            </div>
            {!isCollapsed && (
                <div className={styles.chatList}>
                    <ChatListItemButton name='Chat de exemplo' />
                </div>
            )}
        </aside>
    );
}