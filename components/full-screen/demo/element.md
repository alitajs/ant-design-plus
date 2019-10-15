---
order: 1
title: 控制某个DOM节点 
---

点击图片

```jsx
const Example = () => {
  return (
    <div>
      <FullScreen>
        <div 
          style={{ 
            height: 300,
            width: 500,
            backgroundImage: 'url("https://aip.bdstatic.com/portal-pc-node/dist/1568277945052/images/technology/face/detect/demo-card-1.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
          }}
        />
      </FullScreen>
    </div> 
  )
}

render(
  <Example />
)
```
