import { provideBlogCategories, provideBlogPosts } from "@/next-data/providers/blogData";

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const BLOG_POSTS_PER_PAGE = 6;

export const BLOG_CATEGORIES_PAGE = new Map([
    ...provideBlogCategories().map(cat => [`blog/${cat}`, 'blog-category']),
    ...provideBlogCategories().map(cat => {
      const pages = provideBlogPosts(cat).pagination.pages;
      return [...Array(pages).keys()].map(page => `blog/${cat}/page/${page+1}`)
    }).map(paths => paths.map(path => [path, 'blog-category'])).flat()
]);
  
export const STATIC_PAGE = new Map([['aboutMe', 'aboutMe']]);