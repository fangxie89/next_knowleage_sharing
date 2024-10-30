---
title: Random
layout: react
---

# useId

used when need to use same input more than 1 time in 1 component

``` js
const Form = () => {
    return (
        <form>
            <EmailInput name="email" />
            <EmailInput name="confrim" />
        </form>
    )
}

function EmailInput({name}) {
    const id = useId()

    return (
        <>
            <label htmlFor={id}>{name}</label>
            <input id={id} type="email" />
        </>
    )
}
```