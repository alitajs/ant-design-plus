---
order: 0
title: 
  zh-CN: 基础样例
  en-US: Basic Example
---

## zh-CN

点击按钮切换全屏

## en-US

Click the button to switch to full screen.

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
