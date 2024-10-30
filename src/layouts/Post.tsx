import type { FC, PropsWithChildren } from "react";
import NavBar from "@/src/components/Container/NavBar";
import { getClientContext } from "@/client-context";
import style from "./layouts.module.css";

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = getClientContext();

  return (
    <>
      <NavBar />

      <div className={style.postLayout}>
        <main>
          <h1>{frontmatter.title}</h1>
          {children}
        </main>
      </div>
    </>
  );
};

export default PostLayout;
