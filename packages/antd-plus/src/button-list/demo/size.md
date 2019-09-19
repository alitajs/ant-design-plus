---
order: 1
title: 修改button大小
---

设置button大小

```jsx
<ButtonList
  size="small"
  list={[
    { text: '新增', type: 'primary', onClick: () => console.log(1) },
    { text: '修改', type: 'default', onClick: () => console.log(2) },
    { text: '删除', type: 'dashed', onClick: () => console.log(3) },
    { text: '全选', type: 'default', onClick: () => console.log(4) }
  ]}
/>
```
