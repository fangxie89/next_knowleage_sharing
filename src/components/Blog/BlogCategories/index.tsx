import { BlogPostsRSC } from "@/types";
import type { ComponentProps, FC } from "react";
import LinkTabs from "@/src/components/Common/LinkTabs";
import BlogPostCard from "@/src/components/Common/BlogPostCard";

type BlogCategoriesProps = {
  categories: ComponentProps<typeof LinkTabs>["tabs"];
  blogData: BlogPostsRSC & { category: string };
};
const BlogCategories: FC<BlogCategoriesProps> = ({ categories, blogData }) => {
  return (
    <>
      <LinkTabs tabs={categories} activeTab={blogData.category}>
        <div className="max-xs:grid-cols-[1fr] grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.80),1fr))] [grid-gap:theme(spacing.12)_theme(spacing.8)]">
          {blogData.posts.map((post) => (
            <BlogPostCard
              title={post.title}
              category={post.categories[0]}
              date={post.date}
              key={post.title}
              slug={post.slug}
            ></BlogPostCard>
          ))}
        </div>
      </LinkTabs>
    </>
  );
};

export default BlogCategories;
