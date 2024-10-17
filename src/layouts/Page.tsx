import type { FC, PropsWithChildren } from "react";
import NavBar from "@/src/components/Container/NavBar";
import Sidebar from "@/src/components/Container/Sidebar";

import style from "./layouts.module.css";

import { PageLayoutKey } from "@/types/navigation";

export type PageLayoutProps = PropsWithChildren & {
    navKey: PageLayoutKey
}
const PageLayout: FC<PageLayoutProps> = ({children, navKey}) => {
    return (
        <>
        <NavBar />
        <div className={style.pageLayout}>
            <Sidebar navKey={navKey} />
            <main className={style.mainContent}>{children}</main>
        </div>
        </>
    )
}

export default PageLayout;