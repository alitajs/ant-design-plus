---
order: 0
title: 基础样例
---

点击按钮切换全屏

```jsx
const Example = () => {
  return (
    <div>
      <FullScreen isBody={true}>
        <Button>切换全屏</Button>  
      </FullScreen>
    </div> 
  )
}

render(
  <Example />
)
```
