---
title: useMutation()
layout: react
---

# useMutation

Basic usage:

```js
import { useMutation, useQueryClient } from "@tanstack/react-query";

function YourComponent() {
  const queryClient = useQueryClient();
  const mutation = useMutation((newTodo) => addTodo(newTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleAddTodo = async () => {
    mutation.mutate({ title: "New Todo" });
  };

  return (
    <button onClick={handleAddTodo} disabled={mutation.isLoading}>
      Add Todo
    </button>
  );
}

async function addTodo(newTodo) {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
}
```

## Tips 1: mutate/mutateAsync

mutate: excute directly mutation
mutateAsync: return a Promise, could handle by async/await

```js
const mutation = useMutation(addTodo);

const handleAddTodo = async () => {
  try {
    const data = await mutation.mutateAsync({ title: "new todo" });
  } catch (err) {
    console.error(error);
  }
};
```

## Tips 2: optimistic updates

update data before request finish.

```js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function YourComponent() {
    const queryClient = useQueryClient();

    const addTodo = async (addTodo) => {
      await axios.put(`/todos/${addTodo.id}`, addTodo);
    }

    cosnt mutation = useMutation(addTodo, {
      // trigger ui update before mutation function
        onMutate: async (newTodo) => {
            // cancel query ongoing
            await queryClient.cancelQueries(['todos']);

            // take current cached data, used for error rollback
            const previousTodos = queyrClient.getQueryData(['todos']);

            // optimistic update, set data into cache before request finish
            queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);

            // return rollback
            return { previousTodos }
        },
        onError: (err, newTodo, context) => {
            // roll back to previous if fail
            queryClient.setQueryData(['todos'], context.previousTodos);
        },
        onSettled: () => {
            // refetch after request success/fail
            queryClient.invalidateQueries(['todos']);
        }
    });

    return(
      <button onClick={() => mutation.mutate({ id: 1, title: 'New todo' })}
        Add Todo
      </button>
    );
  }
```
On click the button, the UI could updated before mutate request, if request fail, the UI will roll back the the state before.

### best practice

Encapsulate the logic of Optimistic update as a hook

```js
import { useMutation, userQueryClient } from '@tanstack/react-query';

const useOptimisticUpdate = (queryKey, updateFn) => {
  const queryClient = useQueryClient();

  return useMutation(updateFn, {
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries(queryKey);

      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => oldData.map(item => item.id === updatedItem.id ? {... item, ...updatedItem }: item));
      
      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    }
    onsettled: () => {
      queryClient.invalidateQueries(queryKey);
    }
  });
}
```