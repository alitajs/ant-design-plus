---
order: 0
title: 基础样例
---

权限组件使用示例

```jsx
const AuthorizedPlus = (props) => {
  const actions = [
    { module: 'module1', action: 'action1' },
    { module: 'module1', action: 'action2' },
    { module: 'module1', action: 'action3' },
    { module: 'module2', action: 'action1' },
    { module: 'module2', action: 'action2' }
  ];
  const policy = new Policy(actions);
  
  policy.addPolicy({
    version: 1,
    statement: [
      {
        effect: 'allow',
        action: [
          'module1/*'
        ]
      }
    ]
  });
  
  return (
    <Authorized {...props} policy={policy} />
  )
}

const NoAuth = () => {
  return (
    <span style={{ color: '#ff4d4f' }}>no auth</span>  
  )
}

render(
  <div className="authorized-demo">
    <AuthorizedPlus authority="*">
      <Button type="primary">操作1</Button>
    </AuthorizedPlus>
     
    <AuthorizedPlus authority="module1/action1">
      <Button type="primary">操作2</Button>
    </AuthorizedPlus>
    
    <AuthorizedPlus authority="module2/action1" noMatch={<NoAuth />}>
      <Button type="primary">操作3</Button>
    </AuthorizedPlus> 
  </div>
)
```

<style>
  .authorized-demo {
    .ant-btn {
      margin-right: 16px;
    }
  }
</style>
