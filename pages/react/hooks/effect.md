---
title: Effect
layout: react
---

# useEffect

## Execution order:

### During the first render:
- Render the DOM.
- Execute the side effect function in useEffect.
### When dependencies update:
- Render the new DOM.
- Execute the cleanup function from the previous useEffect.
- Execute the new side effect function.
### When the component unmounts:
- Execute the cleanup function from useEffect.

## When not?

- event based side effect:
 
 use directly event handler
``` js
<button onClick={saveData}>save</button>
```

- fetching data

use React Query/Next.js instead


# useLayoutEffect

## usage

set initial state

``` js
const ref = useRef(null)
const [tooltipHeight, setTooltipHeight] = useState(0)

// runs synchronously after the DOM mutations, but before painting
useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect()
    setTooltipHeight(height)
})
```

Inside useLayoutEffect, ref.current.getBoundingClientRect() is called to get the dimensions of the element that ref points to. Specifically, { height } destructures the height property from the returned DOMRect object.
setTooltipHeight(height) updates the tooltipHeight state with the actual height of the tooltip element.