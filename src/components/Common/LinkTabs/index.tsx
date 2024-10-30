import classNames from "classnames";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";
import style from './index.module.css';

type LinkTab = {
  label: string;
  key: string;
  link: string;
};
type LinkTabsProps = {
  tabs: Array<LinkTab>;
  activeTab: string;
};
const LinkTabs: FC<PropsWithChildren<LinkTabsProps>> = ({
  tabs,
  activeTab,
  children,
}) => {
  return (<>
    <div className={style.tabsList}>
        {tabs.map(tab => (
            <Link href={tab.link} key={tab.key} className={classNames(style.tabsTrigger, {[style.active]: tab.key === activeTab })}>{tab.label}</Link>
        ))}
    </div>
    {children}
  </>)
};

export default LinkTabs;
