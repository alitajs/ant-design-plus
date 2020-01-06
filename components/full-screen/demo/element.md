---
order: 1
title:
  zh-CN: 控制某个DOM节点
  en-US: Control DOM
---

## zh-CN

点击图片

## en-US

Click image.

```jsx
const Example = () => {
  const [isFull, setIsFull] = React.useState(false);

  const handleClick = () => {
    setIsFull(!isFull);
  };

  return (
    <div>
      <FullScreen enabled={isFull}>
        <div
          onClick={handleClick}
          style={{
            height: 300,
            width: 500,
            backgroundImage:
              'url("https://aip.bdstatic.com/portal-pc-node/dist/1568277945052/images/technology/face/detect/demo-card-1.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
          }}
        />
      </FullScreen>
    </div>
  );
};

render(<Example />);
```
