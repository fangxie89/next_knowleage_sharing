'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import style from './index.module.css';
import classNames from "classnames";
import ActiveLink from "@/src/components/Common/ActiveLink";

type SidebarItemProps = {
    label: string,
    link: string
}
const SidebarItem: FC<SidebarItemProps> = ({label, link}) => {
    const pathname = usePathname();

    return (<ActiveLink href={link} className={style.sidebarItem} activeClassName={style.active}>{label}</ActiveLink>)
}

export default SidebarItem;