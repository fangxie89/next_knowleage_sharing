import type { FC, PropsWithChildren } from "react";
import style from './index.module.css';
import ActiveLink from "@/src/components/Common/ActiveLink";

type NavItemProps = PropsWithChildren & {
    link: string,
    className?: string
}

const NavItem: FC<NavItemProps> = ({link, children}) => {
    return (
        <ActiveLink 
        href={link}
        className={style.navItem}
        activeClassName={style.active}
        allowSubPath={true}
        >
            {children}
        </ActiveLink>
    )
}

export default NavItem;
