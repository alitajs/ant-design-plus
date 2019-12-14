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
  const defaultData = [1, 2, 3];
  const [data, setData] = React.useState(defaultData);

  const handleAddClick = () => {
    setData([...data, data.length + 1])
  }

  const handleResetClick = () => {
    setData(defaultData)
  }

  return (
    <div>
      <Button onClick={handleAddClick}>
        添加
      </Button>
      <Button onClick={handleResetClick}>
        重置
      </Button>
      <br />
      <br />
      <ScrollableBar 
        key="ScrollableBar-01"
        className="scrollable-bar-demo-01"
        style={{
          width: 400
        }}
      >
        {data.map(((item, index) => {
          return (
            <ScrollableBar.Item key={`item-${index}`}>
              helloworld{item}
            </ScrollableBar.Item>
          )
        }))}
      </ScrollableBar>
    </div>
  )
}

render(
  <Example />
)
```

<style>
  .scrollable-bar-demo-01 {
    .ant-plus-scrollable-bar-item {
      padding: 0 10px;
    }
  }
</style>
