'use client';

import Link from "next/link";
import type { FC } from "react";
import Image from "next/image";
import NavItem from "./NavItem";
import useSiteNavigation from "@/src/hooks/useSiteNavigation";
import style from "./index.module.css";
import ThemeToggle from "@/src/components/Common/ThemeToggle";
import { useTheme } from 'next-themes';

const NavBar: FC = () => {
  const { resolvedTheme, setTheme } = useTheme(); 
  const { navigationItems } = useSiteNavigation();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <nav className={style.container}>
      <div>
        <Link className={style.nodeIconWrapper} href="/" aria-label="Home">
          <Image src="/logo.png" alt="logo-image" width="50" height="50" />
        </Link>
      </div>
      <div className={style.main}>
        <div className={style.navItems}>
          {navigationItems.map(([, { label, link }]) => (
            <NavItem key={label} link={link}>
              {label}
            </NavItem>
          ))}
        </div>
        <div className={style.actionsWrapper}>
          <ThemeToggle onClick={toggleCurrentTheme} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
