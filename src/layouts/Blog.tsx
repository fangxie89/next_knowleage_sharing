import type { FC, PropsWithChildren } from "react";
import BlogHeader from "../components/Blog/BlogHeader";
import { getClientContext } from "@/client-context";
import NavBar from "../components/Container/NavBar";
import BlogCategories from "../components/Blog/BlogCategories";
import getBlogData from "@/next-data/blogData";
import style from './layouts.module.css';

const getBlogCategory = async (pathname: string) => {
    const [, , category = 'all', , page = 1] = pathname.split('/');

    const { posts, pagination } = await getBlogData(category, Number(page));
    return {
        posts,
        pagination,
        category,
        page: Number(page)
    }
}
const BlogLayout:FC<PropsWithChildren> = async ({ children }) => {
    const { pathname } = getClientContext();

    const mapCategoriresToTabs = (categories: string[]) => {
        return categories.map((category) => ({
            label: category,
            link: `/blog/${category}`,
            key: category
        }));
    }

    const blogData = await getBlogCategory(pathname);
    return (
    <>
        <NavBar />
        <div className={style.blogLayout}>
            <main className={style.blogLayoutMain}>
            <BlogHeader />
            <BlogCategories blogData={blogData} categories={mapCategoriresToTabs([
                'all',
                'javascript',
                'css'
            ])} />
            </main>
        </div>
    </>
    );
} 

export default BlogLayout;