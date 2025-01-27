import { useState, Dispatch, SetStateAction } from 'react';
import { PanelLeft, Home, LayoutGrid } from 'lucide-react';
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
            <IconButton
                icon={<PanelLeft size={24} />}
                title={isCollapsed ? "Expandir menu" : "Recolher menu"}
                onClick={() => setIsCollapsed(!isCollapsed)}
            />
            <div className={styles.asideMainButtons}>
                <AsideMainButton 
                    icon={<Home size={24} />} 
                    label="Início" 
                    title="Início"
                    onClick={() => setActiveSection('home')}
                />
                <AsideMainButton 
                    icon={<LayoutGrid size={24} />} 
                    label="Espaços" 
                    title="Espaços"
                />
            </div>
            <div className={styles.chatList}>
                <ChatListItemButton name='Chat de exemplo' />
            </div>
        </aside>
    );
}