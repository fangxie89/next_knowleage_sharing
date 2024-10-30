---
date: "2024-10-30T12:00:00.000Z"
category: javascript
title: Funny 'nb'
layout: blog-post
---

```js
([][[]] + [])[+!![]] + ([] + {})[+!![] + +!![]]
```

[][[]] => [][''] => undefined

[+!![]] => [+1] => [1]

'undefined'[1] => 'n'

[] + {} => '' + [Object Object] => '[Object Object]'

+!![] => 1

'[Object Object]'[1 + 1] => 'b'

'n' + 'b' => 'nb'