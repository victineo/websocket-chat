import { PanelLeft, Home, LayoutGrid } from 'lucide-react';
import styles from './Aside.module.css';

import IconButton from '../IconButton/IconButton';
import AsideMainButton from '../AsideMainButton/AsideMainButton';

export default function Aside() {
    return (
        <aside className={styles.aside}>
            <IconButton icon={<PanelLeft size={24} />} title="Recolher menu" />
            <div className={styles.asideMainButtons}>
                <AsideMainButton icon={<Home size={24} />} label="Início" title="Início" />
                <AsideMainButton icon={<LayoutGrid size={24} />} label="Espaços" title="Espaços" />
            </div>
        </aside>
    );
}