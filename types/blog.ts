export type BlogPost = {
    title: string,
    username: string,
    date: Date,
    categories: Array<string>
    slug: string
}

export interface blogData {
    posts: Array<BlogPost>
    categories: Array<string>
}

export interface BlogPagination {
    next: number | null;
    prev: number | null;
    pages: number;
    total: number;
  }
  
  export interface BlogPostsRSC {
    posts: Array<BlogPost>;
    pagination: BlogPagination;
  }
  