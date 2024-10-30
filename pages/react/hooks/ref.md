---
title: Ref
layout: react
---

# useRef
## characteristics：
- Data modification does not trigger re-rendering.
- It is mutable. (modify directly)

## useage:

- save timer:

```js
const [timer, setTimer] = useState(0);
const intervalRef = useRef()

const startTimer = () => {
    intervalRef.current = setInterval(() => {
        setTimer(pre => pre + 1)
    }, 1000)
}

const stopTimer = () {
    cleanInterval(intervalRef.current);
}

<p> Timer: {timer} seconds </p>
<button onClick={startTimer}>start timer</button>
<button onClick={stopTimer}>stop timer</button>
```

intervalRef won't affect or reset by the page re-render.

- save Dom element

``` js
const inputEl = useRef(null)

const handleFocus = () => {
    inputEl.current.focus()
}

<input ref={inputRef} type="text"/>
<button onClick={handleFocus}>Focus</button>
```


## tips 1:

Could conbine useRef with Context Provider, could use useRef to hold a mutable reference, it will not trigger re-render when changing. and it allows any component consumes the context to modify it.

```js
const MyContext = createContext();

const MyProvider = ({children}) => {
    const myRef = useRef(0);

    <Mycontext.Provider value={myRef.current}>
        {children}
    </Mycontext.Provider>
}

```

## tips 2

To remember the value from last round render

```js
function PreviousValueTracker({ value }) {
  const previousValueRef = useRef(value);

  useEffect(() => {
    previousValueRef.current = value;  // record current value
  });

  const previousValue = previousValueRef.current;

  return (
    <div>
      <p>Current value: {value}</p>
      <p>Previous value: {previousValue}</p>
    </div>
  );
}
```

## tips 3

Record multipal dom
```js
function DynamicRefs() {
  const refs = useRef([]);

  const addRef = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <div>
      {Array(5).fill(0).map((_, index) => (
        <input key={index} ref={addRef} />
      ))}
      <button onClick={() => console.log(refs.current)}>Log all refs</button>
    </div>
  );
}
```
# useImperativeHandle

## Used to control what is exposed to the parent, 

```js
const CustomInput forwardRef(({props, ref}) => {
    const inputRef = useRef();

    // useImperativeHandle take 3 params
    // useImperativeHandle(ref, createHandle, [dependencies])
    // expose focus method of ref to its parent
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    return <input ref={inputRef} />
})

const ParentComponent = () => {
    const inputRef = ref();

    return (<CustomInput ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>Focus</button>
    )
}
```