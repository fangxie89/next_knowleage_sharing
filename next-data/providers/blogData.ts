import { cache } from "react";

import generateBlogData from '@/next-data/generators/blogData.mjs';

import { BLOG_POSTS_PER_PAGE } from '@/next.constats.mjs';
import { blogData, BlogPostsRSC } from "@/types/blog";

const { categories, posts } = await (generateBlogData() as Promise<blogData>);

export const provideBlogCategories = cache(() => categories);

export const provideBlogPosts = cache((category: string): BlogPostsRSC => {
    const categoryPosts = posts.filter(post => post.categories.includes(category)).sort((a, b) => b.date.getTime() - a.date.getTime());
    const total = categoryPosts.length / BLOG_POSTS_PER_PAGE;

    return {
        posts: categoryPosts,
        pagination: {
            prev: null,
            next: null,
            pages: Math.floor(total % 1 === 0 ? total : total + 1),
            total: categoryPosts.length
        }
    }
})

export const providePaginatedBlogPost = cache(
    (category: string, page: number): BlogPostsRSC => {
        const { posts, pagination } = provideBlogPosts(category);

        const actualPage = page < 1 ? 1 : page;

        if (actualPage <= pagination.pages) {
            return {
                posts: posts.slice(
                    BLOG_POSTS_PER_PAGE * (actualPage - 1),
                    BLOG_POSTS_PER_PAGE * actualPage
                ),
                pagination: {
                    prev: actualPage > 1 ? actualPage -1 : null,
                    next: actualPage < pagination.pages ? actualPage + 1 : null,
                    pages: pagination.pages,
                    total: posts.length
                }
            }
        }

        return {
            posts: [],
            pagination: {
                prev: pagination.total,
                next: null,
                pages: pagination.pages,
                total: posts.length
            }
        }
    }
)