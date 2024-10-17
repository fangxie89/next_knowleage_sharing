import { dynamicRouter } from "@/next.dynamic.mjs";
import MDXRenderer from "@/src/components/mdxRenderer";
import WithLayout from "@/src/components/withLayout";
import type { FC } from "react";

type PageParams = {
  params: {
    path: string[];
  };
};
const getPage: FC<PageParams> = async ({ params }) => {
  const { path } = params;

  if (!path) {
    return (<WithLayout layout='home'></WithLayout>)
  }

  const { source, filename } = await dynamicRouter.getMarkdownFile(
    path.join('/')
  );

  if (source.length && filename.length) {
    const { MDXContent, frontmatter, headings, readingTime } =
      await dynamicRouter.getMDXContent(source, filename);

      const layout = frontmatter.layout;
    return (
      <WithLayout layout={layout}>
        <MDXRenderer Component={MDXContent}></MDXRenderer>;
      </WithLayout>
    );
  }
};

export default getPage;
