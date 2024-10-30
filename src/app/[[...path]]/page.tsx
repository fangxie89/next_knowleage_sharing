import { setClientContext } from "@/client-context";
import { provideBlogCategories, provideBlogPosts } from "@/next-data/providers/blogData";
import { dynamicRouter } from "@/next.dynamic.mjs";
import MDXRenderer from "@/src/components/mdxRenderer";
import WithLayout from "@/src/components/withLayout";
import type { FC } from "react";

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

    const blogCategories = provideBlogCategories();
  
    const blogCategoriesPage = [
      ...blogCategories.map(cat => `/blog/${cat}`),
      ...blogCategories.map(cat => {
        const pages = provideBlogPosts(cat).pagination.pages;
        return [...Array(pages).keys()].map(page => `/blog/${cat}/page/${page+1}`)
      }),
    ].flat();

    const pathname = `/${path.join('/')}`;
    if (blogCategoriesPage.includes(pathname)) {
    const sharedContext = { pathname: pathname };

    setClientContext(sharedContext);
    
    return (
        <WithLayout layout='categories' />
    );
    }
  
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    path.join('/')
  );
  

  if (source.length && filename.length) {
    const { MDXContent, frontmatter, headings, readingTime } =
      await dynamicRouter.getMDXContent(source, filename);

      console.log('frontmatter', frontmatter);
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
