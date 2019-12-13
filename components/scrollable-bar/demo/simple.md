---
order: 0
title:
  zh-CN: 基础样例
  en-US: Basic Simple
---

## zh-CN

基础样例

## en-US

Simplest of usage.

```jsx
const Example = () => {
  return (
    <ScrollableBar 
      key="ScrollableBar-01"
      style={{
        width: 400
      }}
    >
      <ScrollableBar.Item key="item-01">
        helloworld1
      </ScrollableBar.Item>
      <ScrollableBar.Item key="item-02">
        helloworld2
      </ScrollableBar.Item>
      <ScrollableBar.Item key="item-03">
        helloworld3
      </ScrollableBar.Item>
      <ScrollableBar.Item key="item-04">
        helloworld4
      </ScrollableBar.Item>
      <ScrollableBar.Item key="item-05">
        helloworld5
      </ScrollableBar.Item>
      <ScrollableBar.Item key="item-06">
        helloworld6
      </ScrollableBar.Item>
      <ScrollableBar.Item key="item-07">
        helloworld7
      </ScrollableBar.Item>
    </ScrollableBar>
  )
}

render(
  <Example />
)
```
