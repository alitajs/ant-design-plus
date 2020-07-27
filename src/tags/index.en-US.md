---
title: Tags 多标签
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# Tags 多标签

需要折叠展示的多标签

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

## API

| 参数      | 说明                         | 类型          | 默认值 | 版本 |
| --------- | ---------------------------- | ------------- | ------ | ---- |
| className | 额外的样式类                 | string        | --     | --   |
| style     | 额外的样式                   | CSSProperties | --     | --   |
| list      | 配置数据                     | array         | []     | --   |
| max       | 显示的最大数目               | number        | 3      | --   |
| flexible  | 是否根据容器宽度动态显示 tag | boolean       | false  | --   |

**配置数据类型**

```ts
{
  text: string;
  icon?: ReactNode;
  color?: string;
}
```
