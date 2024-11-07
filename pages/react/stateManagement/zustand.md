---
title: Zustand
layout: react
---

# Zustand

## Basic usage

### create store

```js
import create from 'zustand';

const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count -1 }))
}))
```

### use store

```js
import React from 'react';
import useStore from './store';

function Counter() {
    const count = useStore((state) => state.count);
    const increment = useStore((state) => state.increment);
    const decrement = useStore((state) => state.decrement);

    return (
        <div>
            <h1>{count}</h1>
            <button onclick={increment}>+</button>
            <button onclick={decrement}>-</button>
        </div>
    )
}

export default Counter;
```

## async action

```js
const useStore = create((set) => ({
    data: null,
    fetchData: async () => {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        set({ data });
    }
}));
```

## middleware

### persist

```js
import create from 'zustand';
import { persist } from 'austand/middleware';

const useStore = create(
    persist(
        (set) => ({
                count: 0,
                increment: () => set((state) => ({ count: state.count + 1}));
        }),
        {
            name: 'counter-storage'
        }
    )
)
```

### logging

```js
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
    devtools((set) => ({
        count: 0,
        increment: () => set((state) => ({
            count: state.count + 1
        }))
    }))
)
```

## use zustand with context api

using zustand combine with context api could make it possible to set the initial state for austand store

### normal way:

```js
// countStore.js

import { create } from 'zustand';

type CountStore = {
    count: number,
    inc: () => void
}

export const useCountStore = create<CountStore>((set) => {
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 }))
})
```

Problem:
1. Can't initialise state with the props of the component
2. Store is defined outside react, so it's reachable everywhere

### zustand with context:

```js
import { createContext } from 'react';
import { StoreApi } from 'zustand';

type CountStore = {
    count: number,
    inc: () => void
}

const CountContext = createContext<StoreApi<CountStore> | undefined>(undefined);
type CountProviderProps = PropsWithChildren && {
    initialValue: number
}

export default function CountContextProvider({children, initialValue}: CountProviderProps) {
    const [store] = (()=>createStore<CountStore>((set)=>({
        count: initialValue,
        inc: () => set((state)=>({count: state.count+1}))
    })))
    return <CountContext.Provider value={store} >
    {children}
    </CountContext.Provider>
}

export function useCountStore<T>(selector: (state: CountStore => T)) {
    const context = useContext(CountContext);

    if(!context) {
        throw new Error('can\'t find store')
    }

    return useStore(context, selector);
}
```
It could be controlled where to use it, also it could set initialValue.
