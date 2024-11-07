---
title: easy peasy
layout: react
---

# easy-peasy

## Basic usage

### Create model and store

```js
import { action, createStore } from 'esay-peasy';

const storeModel = {
    // state
    count: 0,

    // action
    increment: action((state) => {
        state.count += 1;
    })

    decrement: action((state) => {
        state.count -= 1;
    })
};

const store = createStore(storeModel);

export default store;
```

### Inject store with StoreProvider

```js
// App.js

import React from 'react';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import Counter from './Counter';

function App() {
    return (
        <StoreProvider store={store}>
            <Counter />
        </StoreProvider>
    )
}

export default App;
```

### Use hooks useStoreState and useStoreActions to access state and action

```js
//Counter.js
import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

function Counter() {
    const count = useStoreState((state) => state.count);
    const increment = useStoreActions((actions) => actions.increment);
    const decrement = useStoreActions((actions) => actions.decrement);

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

## API

### action

Define sync action

```js
const storeModel = {
    count: 0,
    incrementBy: action((state, payload) => {
        state.count += payload;
    })
}
```

### thunk

Define async action

```js
import { thunk } from 'easy-peasy';

const storeModel = {
    count: 0,
    fetchCount: thunk(async (actions) => {
        const data = await fetch('/api/count').then((res) => res.json());
        actions.setCount(data.count);
    }),
    setCount: action((state, payload)) => {
        state.count = payload;
    }
}
```

### computed

Define derived state(similar to computed in Vue), auto compute base on other state value

```js
import { computed } from 'easy-peasy';

const storeModel = {
    count: 0,
    doubleCount: computed((state) => state.count * 2);
}
```

### listen

Trigger base on other actions.

```js
import { listen, action } from 'easy-peasy';

const storeModel = {
    count: 0,
    increment: action((state) => {
        state.count += 1;
    }),
    logIncrement: listen((on) => {
        on(storeModel,increment, () => {
            console.log('increment action is triggered');
        });
    })
};
```

### persist

persist store

```js
import { persist } from 'easy-peasy';

const storeModel = {
    count: 0,
    increment: action((state) => {
        state.count += 1;
    })
};

const store = createStore(persist(storeModel, { storeage: 'localStorage' }));
```

### store.rehydrate()

Manually trigger load data from persist
```js
import { persist } from 'easy-peasy';

const storeModel = {
    count: 0,
    increment: action((state) => {
        state.count += 1;
    })
};

const store = createStore(persist(storeModel, { storeage: 'localStorage' }));

store.rehydrate();
```