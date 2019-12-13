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
  return (
    <ScrollableBar 
      key="ScrollableBar-02"
      activeKey="05"
      className="scrollable-bar-demo-02"
      style={{
        width: 400
      }}
    >
      <ScrollableBar.Item key="01">
        helloworld1
      </ScrollableBar.Item>
      <ScrollableBar.Item key="02">
        helloworld2
      </ScrollableBar.Item>
      <ScrollableBar.Item key="03">
        helloworld3
      </ScrollableBar.Item>
      <ScrollableBar.Item key="04">
        helloworld4
      </ScrollableBar.Item>
      <ScrollableBar.Item key="05">
        helloworld5
      </ScrollableBar.Item>
      <ScrollableBar.Item key="06">
        helloworld6
      </ScrollableBar.Item>
      <ScrollableBar.Item key="07">
        helloworld7
      </ScrollableBar.Item>
    </ScrollableBar>
  )
}

render(
  <Example />
)
```

<style>
  .scrollable-bar-demo-02 {
    .ant-plus-scrollable-bar-item {
      cursor: pointer;
    }

    .ant-plus-scrollable-bar-item-active {
      background: #1890ff
    }
  }
</style>
