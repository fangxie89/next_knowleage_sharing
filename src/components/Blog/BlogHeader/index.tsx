import style from './index.module.css';

const BlogHeader = () => {
  return (
    <header className={style.blogHeader}>
      <h1 className={style.blogHeaderH1}>Blog</h1>
      <p className={style.blogHeaderP}>Share other resource like js, css</p>
    </header>
  );
};

export default BlogHeader;
