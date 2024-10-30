---
date: "2015-12-08T12:00:00.000Z"
category: javascript
title: class private fields
layout: blog-post
---

```js
class A {
  #privateField = 0;
  constructor() {
    this.#privateField = 1;
  }
}
var a = new A();
// console.log(a.#privateField);
// SyntaxError: Private field '#privateField' must be declared in an enclosing class
```
