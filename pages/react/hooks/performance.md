---
title: Performance
layout: react
---

# useMemo

## basic usage

``` js
const MyComponent = ({ list }) => {
  const expensiveCalculation = useMemo(() => {
    return list.reduce((acc, item) => acc + item.value, 0);
  }, [list]); // only calculate when list change

  return <div>{expensiveCalculation}</div>;
};
```

## tips 1

``` js
const MyComponent = ({ user }) => {
  const userInfo = useMemo(() => ({ name: user.name, age: user.age }), [user.name, user.age]);

  return <ChildComponent userInfo={userInfo} />; // child component need to use React.memo
};
```
Object is going to create on every re-render, if the object is sending as a prop of child component, it will cause child component unnecessary re-render.

## tips 2

for complicated multi layer calculation, could useMemo separate the calculation
```js
const MyComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return processRawData(data);
  }, [data]);

  const filteredData = useMemo(() => {
    return processedData.filter(item => item.active);
  }, [processedData]);

  return <DataList items={filteredData} />;
};
```

# useCallback

## tips 1

handleClick is going to create every time when parent component re-render, wrap the function with useCallback to prevent child re-render when unnecessary.
```js
import React, { useState, useCallback } from 'react';

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click Me</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
};
```