---
order: 0
title: 基础样例
---

默认的最大显示数量

```jsx
render(
  <ButtonList
    list={[
      { text: '新增', type: 'primary', onClick: () => console.log(1) },
      { text: '修改', type: 'default', onClick: () => console.log(2) },
      { text: '删除', type: 'dashed', onClick: () => console.log(3) },
      { text: '全选', type: 'default', onClick: () => console.log(4) }
    ]}
  />
)
```
