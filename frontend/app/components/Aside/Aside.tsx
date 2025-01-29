import { useState, Dispatch, SetStateAction } from 'react';
import { ArrowLeftFromLine, ArrowRightFromLine, Home, LayoutGrid } from 'lucide-react';
import styles from './Aside.module.css';

import IconButton from '../IconButton/IconButton';
import AsideMainButton from '../AsideMainButton/AsideMainButton';
import ChatAccordion from '../ChatAccordion/ChatAccordion';

interface AsideProps {
    setActiveSection: Dispatch<SetStateAction<string>>;
    chats?: string[];
    onAddChat?: (chatName: string) => void;
}

interface ChatsByPeriod {
    today: string[];
    yesterday: string[];
    lastSevenDays: string[];
    lastThirtyDays: string[];
    allTime: string[];
}

export default function Aside({ setActiveSection, chats=[], onAddChat }: AsideProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const categorizeChats = (chats: string[]): ChatsByPeriod => {
        const reversedChats = [...chats].reverse();
        return {
            today: reversedChats.slice(0, 2),
            yesterday: reversedChats.slice(2, 4),
            lastSevenDays: reversedChats.slice(4, 6),
            lastThirtyDays: reversedChats.slice(6),
            allTime: reversedChats.slice(8)
        }
    }

    const categorizedChats = categorizeChats(chats);

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
                    {Object.entries(categorizedChats).map(([title, chats]) => (
                        <ChatAccordion
                            key={title}
                            title={title}
                            chats={chats}
                            onChatClick={() => setActiveSection('chat')}
                        />
                    ))}
                </div>
            )}
        </aside>
    );
}