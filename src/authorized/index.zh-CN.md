---
title: Authorized 权限组件
nav:
  title: 组件
  path: /components
group:
  title: 其他
  path: /other
  order: 100
---

# Authorized 权限组件

## API

### Authorized

| 属性      | 说明                                   | 类型                                                                   | 是否必须 | 默认值 | 备选值 |
| --------- | -------------------------------------- | ---------------------------------------------------------------------- | -------- | ------ | ------ |
| policy    | 权限策略对象                           | [Policy](https://github.com/pansyjs/utils/tree/master/packages/policy) | 是       | --     | --     |
| noMatch   | 验证未通过展示                         | React.ReactNode                                                        | 否       | `null` | --     |
| authority | 权限                                   | `string`、`string[]`                                                   | 是       | --     | --     |
| children  | 需要控制权限的组件或者自定义渲染的函数 | `function`、`React.ReactNode`                                          | 否       | `null` | --     |

**children 为`function`会将权限结果传递给自定义渲染的函数**

```
(isMatch) => {
  // your code
}
```
