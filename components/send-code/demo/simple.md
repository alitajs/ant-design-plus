---
order: 0
title:
  zh-CN: 基础样例
  en-US: Basic Simple
---

## zh-CN

简单使用示例。

## en-US

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
