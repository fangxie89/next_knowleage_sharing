import { MappedNavigationEntry } from "@/src/hooks/useSiteNavigation";
import type { FC } from "react";
import SidebarItem from "@/src/components/Container/Sidebar/SidebarItem";

import styles from './index.module.css';

type SidebarGroupProps = {
    groupName: string,
    items: MappedNavigationEntry[]
}
const SidebarGroup: FC<SidebarGroupProps> = ({ groupName, items }) => {
    return (<section className={styles.group}>
        {groupName}
        <div className={styles.items}>
            {items.map(({label ,link}) => (
                <SidebarItem key={label} link={link} label={label}/>
            ))}
        </div>
    </section>)
}

export default SidebarGroup;