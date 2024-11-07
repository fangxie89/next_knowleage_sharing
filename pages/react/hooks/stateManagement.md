---
title: State Management
layout: react
---

# useState

basic usage:

```js
const [state, setState] = useState(initialState)
```


## tips 1

```js
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(state + 1);
    setState(state + 1);
  }, []);
  ```
First setState won't change vaule of state until re-render. so it runs 2 time 0 + 1

```js
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(pre => pre + 1);
    setState(pre => pre + 1);
  }, []);
```
Using pre here could update with the lastest status

## tips 2

``` js
  const [value, setValue] = useState(() => setInitialFunc());
```
When needs to set initialization with function on useState, using (() => setInitialFunc()), instead of setInitialFunc()

``` js
  const [value, setValue] = useState(setInitialFunc());
```
This will cause the setInitialFunc re-run every time component render without setting useState value.

## tips 3

Add condition on setValue, because even value doesn't change, the setValue still cause re-render
``` js
const [value, setValue] = useState('');

const handleChange = (newValue) => {
    if (newValue !== value) {
        setValue(newValue);
    }
};
```

## tips 4

When using on async, confirm component is still mounted, to avoid memory leak.
``` js
const [data, setData] = useState(null);

useEffect(() => {
    let isMounted = true;

    async function fetchData() {
        const result = await fetchSomeData();
        if (isMounted) {
            setData(result);
        }
    }

    fetchData();

    return () => {
        isMounted = false;
    };
}, []);
```

## Best Pratice

### handling multipal state

```js
export function Component() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  ...
}
```
Better use 1 state to handling all status, for example:
```js
export function Component() {
  const [status, setStatus] = useState<'submitting' | 'error' | 'success' | 'ready'>('ready');
  ...
}
```
# useReducer

basic usage:

``` js
  type State = {
    count: number
  }

  type Action = {
    type: 'increase', 'decrease',
    payload: number
  }

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'increase':
        return {
          ...state,
          count: state.count + 1
        }
      case 'decreaseByPayload':
        return {
          ...state,
          count: state.count - action.payload
        }
      default:
        return state;
    }
  }

  export default Demo () {
    const [state, dispatch] = useReducer(reducer, {count: 0});
    dispath({ type: 'increase' });
    dispatch({ type: 'descrease', payload: 2 });

    return (<></>);
  }

```
# useSyncExternalStore

No knowledge yet. Will update when I need it.