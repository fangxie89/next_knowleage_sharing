import type { FC, PropsWithChildren } from "react";
import NavBar from "@/src/components/Container/NavBar";
import style from "./layouts.module.css";

const HomeLayout: FC = () => {
  return (
    <>
      <NavBar />
      <main className={style.homeLayout}>
        Home
      </main>
    </>
  );
};

export default HomeLayout;
