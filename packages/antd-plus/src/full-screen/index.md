---
title: FullScreen
type: 基础组件
subtitle: 全屏组件
order: 3
---

## API

### FullScreen

| 参数         |   说明       | 类型     | 是否必须     | 默认值      |   备选值    |
| ----------- | ----------- | -------- | ---------- | ---------- | ---------- |
| className   | 额外类名      | string   |  否        |     --     |     --     |
| style       | 额外样式      | React.CSSProperties   |  否        |     --     |     --     |
| isBody      | 是否是整个页面 | boolean   |  否        |   `false` |     --     |
| targetRef   | 需要控制全屏的元素的ref | RefObject<Element>   |  否        |   -- |     --     |
| onChange   | 全屏状态改变的回调 | function   |  否        |   -- |     --     |
