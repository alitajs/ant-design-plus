---
order: 1
title: 其他元素
---

点击切换状态.

```jsx
() => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  
  return (
    <FullScreen
      style={{
        width: 500,
        height: 350
      }}
      isFullScreen={isFullScreen}
    >
      <img 
        width="100%" 
        height="100%" 
        style={{
          cursor: 'pointer'
        }}
        onClick={() => {
          setIsFullScreen(!isFullScreen)
        }} 
        src="https://aip.bdstatic.com/portal/dist/1564665901746/ai_images/technology/face-detect/demo-card-1.jpg"
     />
    </FullScreen>
  )
}
```
