import type { FC, PropsWithChildren } from "react";
import NavBar from "@/src/components/Container/NavBar";
import style from "./layouts.module.css";

const HomeLayout: FC = () => {
  return (
    <>
      <NavBar />
      <div className={style.centerLayout}>
      <main className={style.homeLayout}>
        <h1>About the site:</h1>
        <h2>
        Built using Next.js and React.js, this knowledge and blog-sharing platform is inspired by the structure of node.org. It serves as a system to document and share insights, knowledge, and techniques learned through everyday study and work.
        </h2>
        <h2>
        The site is still under development, with ongoing efforts to explore and refine build techniques in Next.js. The goal is to create a comprehensive resource for sharing practical tips and tricks.
        </h2>
      </main>
      </div>
    </>
  );
};

export default HomeLayout;
