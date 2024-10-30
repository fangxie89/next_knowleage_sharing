---
title: useInfiniteQuery
layout: react
---

# useInfiniteQuery

useInfiniteQuery use getNextPageParam to define next page, so every time when fetch finish, React Query will automaticlly check if there is next page, and load it base on need.

```js
const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest
} = useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage, allPages) => nextPageParam 
});
```

## scroll fetch example

```js
import { useRef, useEffect } from 'react';
import useInfiniteQuery from '@tanstack/react-query';

function InfiniteScrollPosts() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useInfiniteQuery(['posts'], fetchPosts, {
        getNextPageParam: (lastPage) => lastPage.nextPage ?? false
    });

    const loadMoreRef = useRef();

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].inIntersecting) {
                    fetchNextPage();
                }
            }
            { threshold: 1.0 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>An error occurred</p>

    return (
        <div>
            {data.pages.map((page, index) => (
                <div key={index}>
                    {
                        page.data.map((post) => (
                            <p key={post.id}>{post.title}</p>
                        ))
                    }    
                </div>
            ))}

            <div ref={loadMoreRef}>
                {isFetchingNextPage ? 'Loading mmore...' : hasNextPage ? 'Scroll to load more' : 'No more posts'}
            </div>
        </div>
    )
}

```