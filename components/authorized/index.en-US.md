---
title: Authorized
type: Business Components
subtitle: Authorized Component
order: 5
---

## API

### Authorized

| Property  | Description                            | Type                          | Required | Default | Alternative |
| --------- | -------------------------------------- | ----------------------------- | -------- | ------- | ----------- |
| policy    | 权限策略对象                           | Policy                        | 是       | --      | --          |
| noMatch   | 验证未通过展示                         | React.ReactNode               | 否       | `null`  | --          |
| authority | 权限                                   | `string`、`string[]`          | 是       | --      | --          |
| children  | 需要控制权限的组件或者自定义渲染的函数 | `function`、`React.ReactNode` | 否       | `null`  | --          |


**children为`function`会将权限结果传递给自定义渲染的函数**

```
(isMatch) => { }
```
