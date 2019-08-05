---
order: 0
title: 自定义倒计时按钮
---

```jsx
() => {
  const [start, setStart] = React.useState(false);
  
  function handleClick(c) {
    setStart(true);
  }
  
  return (
    <SendCode
      start={start}
      second={15}
      initText="点击"
      runText="剩余{%s}秒"
      onClick={handleClick}
      resetText="重新发送"
      onEnd={() => {
        setStart(false);
      }}
    />
  )
}
```
