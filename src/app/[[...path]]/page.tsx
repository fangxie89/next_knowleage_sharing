import { setClientContext } from "@/client-context";
import { dynamicRouter } from "@/next.dynamic.mjs";
import MDXRenderer from "@/src/components/mdxRenderer";
import WithLayout from "@/src/components/withLayout";
import type { FC } from "react";
import { BLOG_CATEGORIES_PAGE, STATIC_PAGE } from '@/next.constants.mjs';
type PageParams = {
  params: Promise<{
    path: string[];
  }>;
};

const getPage: FC<PageParams> = async ({ params }) => {
  const { path } = await params;

  if (!path) {
    return (<WithLayout layout='home'></WithLayout>)
  }

  if (path[0] === 'soon') {
    return (<WithLayout layout='soon'></WithLayout>)
  }

  const pathname = `${path.join('/')}`;

    if (BLOG_CATEGORIES_PAGE.has(pathname) || STATIC_PAGE.has(pathname)) {
    const sharedContext = { pathname: pathname };

    setClientContext(sharedContext);

    const layoutName = BLOG_CATEGORIES_PAGE.has(pathname) ? BLOG_CATEGORIES_PAGE.get(pathname) : STATIC_PAGE.get(pathname);

    return (
        <WithLayout layout={layoutName} />
    );
    }
  
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    path.join('/')
  );
  

  if (source.length && filename.length) {
    const { MDXContent, frontmatter, headings, readingTime } =
      await dynamicRouter.getMDXContent(source, filename);

      const sharedContext = {
        frontmatter,
        headings,
        pathname: `/${pathname}`,
        readingTime,
        filename,
      };

    setClientContext(sharedContext);

    const layout = frontmatter.layout;
    return (
      <WithLayout layout={layout}>
        <MDXRenderer Component={MDXContent}></MDXRenderer>;
      </WithLayout>
    );
  }
};

export default getPage;
