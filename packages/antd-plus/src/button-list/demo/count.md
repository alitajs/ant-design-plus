---
order: 1
title: 基础样例
---

用户指定展示多少个按钮

```jsx
<ButtonList
  list={[
    { text: '新增', type: 'primary', onClick: () => console.log(1) },
    { text: '修改', type: 'default', onClick: () => console.log(2) },
    { text: '删除', type: 'dashed', onClick: () => console.log(3) },
    { text: '全选', type: 'default', onClick: () => console.log(4) },
  ]}
  maxCount={2}
/>
```
