---
title: ButtonList
type: Basic Components
subtitle: Button Group
order: 4
---

## API

### ButtonList

| Property  | Description        | Type                | Required | Default   | Alternative    |
| --------- | ------------------ | ------------------- | -------- | --------- | -------------- |
| className | 额外类名           | string              | 否       | --        | --             |
| style     | 额外样式           | React.CSSProperties | 否       | --        | --             |
| list      | 按钮数据           | array               | 是       | `[]`      | --             |
| size      | 按钮大小           | string              | 否       | `default` | --             |
| maxCount  | 最多显示几个按钮   | number              | 否       | `3`       | --             |
| isLink    | 按钮是否是 link    | boolean             | 否       | `false`   | --             |
| more      | 自定义更新操作节点 | ReactNode           | 否       | --        | --             |
| moreType  | 更多节点类型       | string              | 否       | --        | `text`, `icon` |

**説明**

- `list` 支持 ant-design button 所有属性，加一个`text`用于设置文本
- `size` 整理设置 button 的大小
