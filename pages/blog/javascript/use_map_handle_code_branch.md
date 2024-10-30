---
date: "2015-12-08T12:00:00.000Z"
category: javascript
title: use map to handle code branches
layout: blog-post
---

```js
function test(key) {
  if (key === 1) {
    console.log("value 1");
  } else if (key === 2) {
    console.log("value 2");
  } else if (key === 3) {
    console.log("value 3");
  } else {
    console.log("value 4");
  }
}
test(1);
```

To handle multi conditions branchs, always create a map for conditions. For complex cases, conditions can be separated out for easier maintenance

```js
function test(key) {
  const map = {
    1: () => console.log("value 1"),
    2: () => console.log("value 2"),
    3: () => console.log("value 3"),
    4: () => console.log("value 4"),
  };
  map[key] && map[key]();
}

test(1);
```

For complicated conditions like:

```js
function test(key) {
  if (key.includes("1")) {
    console.log(key + "value 1");
  } else if (name.endsWith("2")) {
    console.log(key + "value 2");
  } else if (key.length < 3) {
    console.log("value 3");
  } else {
    console.log("value 4");
  }
}

test(1);
```

use tuples to separate conditions and results.

```js
function test(key) {
  const map = [
    [() => key.includes("1"), console.log(key + "value 1")],
    [name.endsWith("2"), () => console.log(key + "value 2")],
    [() => key.length < 3, () => console.log("value 3")],
  ];
  const target = map.find((m) => m[0]());
  if (target) {
    target[1]();
  } else {
    console.log("value 4");
  }
}

test(1);
```
