---
title: queryClient
layout: react
---

# queryClient

## queryClient is the core object of React Query, used for configuration query and cache.

### invalidateQueries

invalidateQueries used to invalid the query from cache and trigger refetch, used after data changed, to make sure data updated.

```js
const queryClient = useQueryClient();
const mutation = useMutation(addTodo, {
  onSuccess: () => {
    queryClient.invalidateQueries(["todos"]);
  },
});
```

After mutate success, we should invalidate the cached data and trigger refetch.

### refetchQueries

refetchQueries is used for fetch query immediately, ignoring the cache state. Similiar to invalidateQueries, but it will fetch immediately.

```js
import { useQueryClient } from "@tanstack/react-query";

function RefreshButton() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.refetchQueries(["todos"]);
  };

  return <button onClick={handleRefresh}>Refresh Todos</button>;
}
```

### Tips difference between invalidateQueries and refetchQueries

invalidateQueries:
Makes specific query 'invalide', then React Query will fetch data when access this specific query next time(re-entering the page or component). but it won't fetch immediately.

Scenario: After data mutation(POST, PUT, DELETE).

refetchQueries:
refetch query immediately, ingore the query status.

Scenario: Manually refresh/force refresh when component loaded

## setQueryData

Used for update query data in cache, normally used for optimistic update.

## getQueryData

Used for get specific query data, if not cached, return 'undefined'.

```js
import { useQueryClient } from "@tanstack/react-query";

function DisplayCachedData() {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(["todos"]);

  return (
    <div>
      {cachedData
        ? cachedData.map((data) => <p key={data.id}>{data.title}</p>)
        : "no data"}
    </div>
  );
}
```

## removeQueries

Remove specific query from cache. Normally used for freeing up memory when the page is not used any more.

### difference between invalidateQueries and removeQueries

invalidateQueries does not clear memory, only set it as stale. So before data fetch finish, the page could show cached data, so the page won't be blank.

invalidateQueries used for refresh data after updating.
removeQueries used for set free memory after page not used.

## cancelQueries

Cancelling ongoing query. used for switching page or component unmounted.

```js
import { useQuery, useQueryClient } from 'tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';

const fetchUserdata = async (userId) => {
    const { data } = await axios.get(`/api/user/${userid}`);
    return data;
}

function UserDetails({userId}) {
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery(
        ['user', userid],
        () => fetchUserData(userId),
        {
            enabled: !!userId
        }
    );

    useEffect(() => {
        return () => {
            queryClient.cancelQueries(['user', userId]);
        };
    }, [queryClient, userId])

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>error loading</p>

    return (
        <div>
            <h2>{user.name}</h2>
        </div>
    )
}

export default UserDetails;
```

## fetchQuery
Fetch Query manually, and cache it into queryClient, it's a synchronous function, will return fetched data.

```js
import { queryClient } from '@tanstack/react-query';

function getUserData(userId) {
    const queryClient = userQueryClient();

    const fetchData = async () => {
        const data = await queryClient.fetchQuery(['user', userId], () => fetch(`/api/users/${userId}`).then((res) => res.json()))
    };

    return <button onClick={fetchData}>Fetch User Data</button>
}
```

## prefetchQuery 
Pre fetch query, and cache it into cache, normally used for route pre load, hover load. async function, return a Promise.

```js
import { queryClient } from '@tanstack/react-query';

function PreFetchLink() {
    const queryClient = useQueryClient();

    const handlePrefetch = () => {
        queryClient.prefetchQuery(['todo'], fetchTodos);
    }

    return <a onMouseEnter={handlePrefetch} href='/todos'>Go to Todos</a>
}
```

## resetQueries
Reset query to the initial state, it will clear the cached data and re-fetch.

```js
import { useQueryClient } from '@tanstack/react-query';

function ResetUser() {
    const queryClient = useQueryClient();

    const handleReset = () => {
        queryClient.resetQueries(['user', userId]);
    };

    return <button onClick={handleReset}>reset user data</button>
}
```

## clear

Clear all queries, nromally used when user logout.
