---
title: Use children to avoid re-render
layout: react
---

# A way to avoid heavy component re-render

```js
// Component.js
export default function Component({children}: PropsWithChildren) {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(123)}>button</button>
      {children}
    </div>
  );
}

// App.js
export default function App() {
    return (
        <Component>
            <HeavyComponent />
        </Component>
    )
}
```

In this way, the children(HeavyComponet) will not re-render when setValue in Component.