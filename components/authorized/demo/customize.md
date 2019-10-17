---
order: 1
title: 自定义渲染逻辑
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

render(
  <div>
    <AuthorizedPlus authority="*">
      {(isMatch) => (
        <span>权限校验结果: {isMatch + ''}</span>
      )}
    </AuthorizedPlus>
    <br />
    <AuthorizedPlus authority="module2/action1">
      {(isMatch) => (
        <span>权限校验结果: {isMatch + ''}</span>
      )}
    </AuthorizedPlus>
  </div>
)
```
