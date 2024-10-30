import { BlogPostsRSC } from "@/types/blog";
import { provideBlogPosts, providePaginatedBlogPost } from "./providers/blogData";

const getBlogData = (cat: string, page?: number): Promise<BlogPostsRSC> => {
    return import('@/next-data/providers/blogData').then(
        ({ provideBlogPosts, providePaginatedBlogPost })=> 
            page ? providePaginatedBlogPost(cat, page) : provideBlogPosts(cat)
    )
}

export default getBlogData;