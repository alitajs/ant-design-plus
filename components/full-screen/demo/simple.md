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
  const [isFull, setIsFull] = React.useState(false);

  const handleClick = () => {
    setIsFull(!isFull);
  };

  return (
    <div>
      <FullScreen
        enabled={isFull}
        target={document.documentElement}
        onClose={(error) => {
          console.log('close');
        }}
      >
        <Button onClick={handleClick}>切换全屏</Button>
      </FullScreen>
    </div>
  );
};

render(<Example />);
```
