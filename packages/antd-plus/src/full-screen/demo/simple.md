---
order: 0
title: 基础样例
---

Simplest of usage.

```jsx
() => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  
  return (
    <div>
      <FullScreen
        isFullScreen={isFullScreen}
      />
      <Button
       onClick={() => {
         setIsFullScreen(!isFullScreen)
       }}
     >切换全屏</Button>  
    </div> 
  )
}
```
