---
title: React 18 lifeCycle
layout: react
---

# React 18 lifeCycle

## Client side

### Mounting(First render)

- Run all code inside function body
- Initialize all values (useState, useMemo, const, var, ...)
- JSX
- Virtual DOM
- DOM
- Browser paint
- Schedule all remaining hooks to run (useEffect)


### Updating(re-render)

- (Cleanup functions(useEffect))
- Run all code inside function body
- Update/re-calculate all values (useState(When state change), useMemo(when dependency change))
- JSX
- Virtual DOM
- DOM
- Browser paint
- Schedule all remaining hooks to run (useEffect)

### Unmounting

- Release all values from memory(useState, useMemo, const, var, ...)
- Cleanup functions(useEffect)
- Virtual DOM
- DOM
- Browser paint