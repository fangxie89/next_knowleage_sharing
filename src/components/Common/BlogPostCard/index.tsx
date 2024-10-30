import Link from "next/link";
import type { FC } from "react";
import style from './index.module.css';

type BlockPostCardProps = {
  title: string;
  category: string;
  desc?: string;
  date?: Date;
  slug?: string;
};
const BlogPostCard: FC<BlockPostCardProps> = ({
  title,
  category,
  desc,
  date,
  slug,
}) => {
  return (
    <article className={style.container}>
      <Link href={`/${slug}` as string} className={style.title}>{title}</Link>

      <Link href={`/blog/${category}`}>{category}</Link>

      {desc && <p className={style.description}>{desc}</p>}
      <footer className={style.footer}>{date && <p className={style.footerDate}>{date.toLocaleDateString()}</p>}</footer>
    </article>
  );
};

export default BlogPostCard;
