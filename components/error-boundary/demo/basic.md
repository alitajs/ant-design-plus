---
order: 0 
title: 
  zh-CN: 基本用法
  en-US: Basic Usage
---

```jsx
const ErrorComponent = () => {
  const [fail, setFail] = React.useState(false);
  
  if (fail) {
    throw new Error('This is an error from render.');
  }
  
  return (
    <div>
      <span style={{ marginRight: 10 }}>你好</span>
      <Button onClick={() => { setFail(true) }}>触发报错</Button>
    </div>
  );
};

const Fallback = ({ error, componentStack }) => (
  <div>
    <div>对不起，程序出错了</div>
    <div>{componentStack}</div>
  </div>
);


render(
  <div>
    <ErrorBoundary Fallback={Fallback}>
      <ErrorComponent />
    </ErrorBoundary>
    <div style={{ marginTop: 10 }}>不会受影响</div>
  </div>
)
```
