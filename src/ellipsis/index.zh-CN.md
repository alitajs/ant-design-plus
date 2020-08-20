---
title: Ellipsis
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# Ellipsis 文本自动省略号

## 代码演示

### 按照字符数省略

<code src="./demo/demo-01.tsx" />

### 按照宽度省略

<code src="./demo/demo-02.tsx" />

### 按照行数省略

<code src="./demo/demo-03.tsx" />

## API

| 参数                 | 说明                                                             | 类型                        | 默认值  | 版本 |
| -------------------- | ---------------------------------------------------------------- | --------------------------- | ------- | ---- |
| className            | 额外的样式类                                                     | `string`                    | --      | --   |
| style                | 额外的样式                                                       | `CSSProperties`             | --      | --   |
| width                | 限制宽度大小                                                     | `number` \| `string`        | --      | --   |
| lines                | 最大显示的行数，超出则截取省略                                   | `number`                    | --      | --   |
| length               | 显示的字符的最大长度，超过则截取省略                             | `number`                    | --      | --   |
| tooltip              | 设置是否使用 tooltip 或者 tooltip 的属性                         | `boolean` \| `TooltipProps` | --      | --   |
| fullWidthRecognition | 是否按照全角字符的长度视为 2 来计算字符串长度, length 模式下有效 | `boolean`                   | `false` | --   |

**注意：** width、lines、length 表示三种模式，使用时设置一种即可
