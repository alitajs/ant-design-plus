---
order: 0
title:
  zh-CN: 作为切换选择
  en-US: Basic Simple
---

## zh-CN

切换选择

## en-US

Simplest of usage.

```jsx
const Example = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7'];
  const [activeKey, setActiveKey] = React.useState(undefined);

  React.useEffect(() => {
    setActiveKey(data[4]);
  }, []);

  return (
    <ScrollableBar
      key="ScrollableBar-02"
      activeKey={activeKey}
      className="scrollable-bar-demo-02"
      style={{
        width: 400
      }}
    >
      {data.map((item) => (
        <ScrollableBar.Item key={item}>helloworld{item}</ScrollableBar.Item>
      ))}
    </ScrollableBar>
  );
};

render(<Example />);
```

<style>
  .scrollable-bar-demo-02 {
    .ant-plus-scrollable-bar-item {
      cursor: pointer;
      padding: 0 10px;
    }

    .ant-plus-scrollable-bar-item-active {
      background: #1890ff
    }
  }
</style>
