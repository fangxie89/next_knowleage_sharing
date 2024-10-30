---
title: useQuery()
layout: react
---

# useQuery

Basic usage:

```js
import { useQuery } from "@tanstack/react-query";

function YourComponent() {
  const { data, isLoading, error } = useQuery(["todos"], fetchTodos);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}

async function fetchTodos() {
  const response = await fetch("/api/todos");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}
```

## useQuery is used for accquire and cache data. Normally for GET request, could aslo used when POST request used for retrieve data.

```js
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery(['postData'], () =>
  fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'search term' }),
  }).then(res => res.json())
);
```

## Tips1: refetchInterval

Re-fetch when fails, and support polling
```js
const { data, isLoading } = useQuery(['todos'], fetchTodos, {
  refetchInterval: 5000, // 每5秒重新获取数据
});
```

## Tips2 staleTime/cacheTime

```js
const { data } = useQuery(['todos'], fetchTodos, {
  staleTime: 1000 * 60 * 5, // 5分钟内数据不再重新请求
  cacheTime: 1000 * 60 * 10, // 10分钟后数据将被移出缓存
});
```
staleTime: 

definition: defined how long the data will be treated as "fresh", during the period, won't be new request.
default: 0

during staleTime, refetch/component mounted won't trigger new data request.

cacheTime:

definition: defined the how long the data will stay in cache when not been used.
default: 5 * 60 * 1000

used for memory optimisation

