import useSiteNavigation from "@/src/hooks/useSiteNavigation";
import { NavigationKey } from "@/types/navigation";
import type { FC } from "react";
import SidebarGroup from "./SidebarGroup";

import styles from './index.module.css';

type SidebarProps = {
  navKey: NavigationKey;
};

const Sidebar: FC<SidebarProps> = ({ navKey }) => {
  const { getSideNavigation } = useSiteNavigation();
  const [[, sidebarNavigation]] = getSideNavigation(navKey);

  const mappedSidebarItems = sidebarNavigation.items.map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    })
  );

  return (
    <nav className={styles.wrapper}>
      {mappedSidebarItems.map(({ groupName, items }) => (
        <SidebarGroup
          key={groupName.toString()}
          items={items}
          groupName={groupName}
        />
      ))}
    </nav>
  );
};

export default Sidebar;
