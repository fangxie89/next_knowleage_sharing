---
title: Ref
layout: react
---

# useTransition

## Basic usage

```js
import { useState, useTransition } from 'react';

const MyComponent = () => {
    const [isPending, startTranstion] = useTranstion();

    const [inputValue, setInputValue] = useState('');
    const [list, setList] = useState([]);

    const handleChange = (e) => {
        setInputValue(e.targe.value);

        startTranstion(() => {
            const newList = haveyComputation(inputValue);
            setList(newList);
        })
    }

    return (
        <input type="text" value={inputValue} onChange={handleInput} />
        { isPending && <p>Loaing ...</p>}
        <ul>
            {list.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    )
}
```

# useDeferredValue