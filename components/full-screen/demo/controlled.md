---
order: 2
title: 受控组件
---

点击按钮切换

```jsx
() => {
  const rootRef = React.useRef(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  
  return (
    <div 
      style={{ 
        height: 300,
        width: 500,
        backgroundImage: 'url("https://aip.bdstatic.com/portal-pc-node/dist/1568277945052/images/technology/face/detect/demo-card-1.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }}
      ref={rootRef}
    >
      <FullScreen 
        status={isFullScreen} 
        targetRef={rootRef}
      />
      <Button 
        onClick={() => { 
          setIsFullScreen(!isFullScreen); 
        }}
      >
        切换
      </Button>
    </div> 
  )
}
```
