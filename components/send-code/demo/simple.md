---
order: 0
title: 基础样例
---

Simplest of usage.

```jsx
const Example = () => {
  const [start, setStart] = React.useState(false);
  
  function handleClick(c) {
    setStart(true);
  }
  
  return (
    <SendCode
      start={start}
      onClick={handleClick}
      onEnd={() => {
        setStart(false);
      }}
    />
  )
}

render(
  <Example />
)
```
