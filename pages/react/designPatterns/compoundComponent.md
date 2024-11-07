---
title: Compound Component
layout: react
---

# Definition

In React, Compound Component is used to build a collection of components that highly related in functionality and can be flexibly composed.

## core concepts

### Parent Component

Provides shared state and behavior
Acts as the control center for data and logic

### Child Components

Use the context data provided by the parent comonent to perform specific tasks
Provide UI and independtent functional framents

Example:

```js
// Select.js
import { createContext, useContext, propsWithChildren } from 'react';

type SelectContextProps = {
    value: string;
    onChange: (value: string) => void;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

type SelectProps = PropsWithChildren & {
    value: string;
    onChange: (value: string) => void;
}

const Select = ({ children, value, onChange }: SelectProps) => {
    return (
        <SelectContext.Provider value={
            {
                selectedValue: value,
                onChange
            }
        }>
        <select
            value={value}
            onChange = {(e) => onChange(e.target.value)}
        >
            {children}
        </select>
        </SelectContext.Provider>
    )
}

type OptionProps = PropsWithChildren & {
    value: string;
}

const Option = ({ value, children }: OptionsProps) => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('can not use it outside context');
    }
    return (
        <option value={value}>
            {children}
        </option>
    )
}

Select.Option = Option;

export default Select;
```

usage:
```js
//App.tsx
import { useState } from 'react';
import Select from './Select';

export default function App() {
    const [value, setValue] = useState('option1');
    return (
        <Select value={value} onchange={setValue}>
            <Select.Option value="option1">Option 1</Select.Option>
        </Select>
    )
}
```