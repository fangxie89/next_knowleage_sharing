---
title: Context
layout: react
---

# useContext

When the value in the context changes, any component that depends on that context will re-render. Specifically, when the value provided by the Context.Provider is updated:

Every component that reads the context using useContext or Context.Consumer will detect this change and trigger a re-render.

## Tips

- separate context to reduce the re-render

- useMemo to wrap value, so only the true value change cause the re-render

 ``` js
const MyContextProvider = ({children}) => {
    const [state, setState] = setState(0);
    const value = useMemo(() => ({ state, setState}), [state]);

    return (
        <Mycontext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}
 ```
 - create hook for useContext

 ``` js
 const CounterContext = createContext();

 const useCounter = () => {
    const context = useContext(CounterContext);
    if(!context) {
        throw Error('useCounter must be useed within a CounterProvider')
    }
    return context;
 }

 const CounterProvider = ({children}) => {
    return (<CounterContext.Provider value = {}>
            {children}
            </CounterContext.Provider>
        )
 }

 export { useCounter, CounterProvider }
 ```
