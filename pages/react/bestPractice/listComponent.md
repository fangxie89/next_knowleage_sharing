---
title: listComponent
layout: react
---

# use renderItem function to make ListComponent able to render all kinds of component

```js
type ListCompontProps = {
    data: any[];
    renderItem: (item: any) => React.ReactNode;
}

export default function ListComponent({data, renderItem}: ListCompontProps) {
    return (
        <div>
            {data.map(item => renderItem(item))}
        </div>
    )
}
```

To use it 
```js
import ListComponent from "./components/listComponent";

type AppProps = {
  users: object[]
}
export default function App({users}: AppProps) {
  return (
    <div>
      <ListComponent 
        data={users}
        renderItem={user => (<UserCard key={user.id} user={user}></UserCard>)}
        />
    </div>
  );
}
```