---
order: 1
title: link
---

提取button type=link 为组件属性

```jsx
<ButtonList
  isLink={true}
  size="small"
  list={[
    { text: '新增', type: 'primary', onClick: () => console.log(1) },
    { text: '修改', type: 'default', onClick: () => console.log(2) },
    { text: '删除', type: 'danger', onClick: () => console.log(3) },
    { text: '全选', type: 'default', onClick: () => console.log(4) }
  ]}
/>
```
