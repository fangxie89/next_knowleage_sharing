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