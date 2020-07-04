---
title: ScrollableBar
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
  order: 20
---

# ScrollableBar 滚动条

提供区域将大量数据进行展现，保持界面整洁。

## 代码演示

### 简单使用

<code src="./demo/demo1.tsx" />

### 多于展示区域

<code src="./demo/demo2.tsx" />

## API

| 属性           | 说明                    | 类型                       | 默认值       | 版本 |
| -------------- | ----------------------- | -------------------------- | ------------ | ---- |
| className      | 额外类名                | string                     | --           | --   |
| style          | 额外样式                | CSSProperties              | --           | --   |
| activeKey      | 当前活动的 Key          | string                     | --           | --   |
| mode           | 展示模式                | `vertical` \| `horizontal` | `horizontal` | --   |
| scrollAnimated | 是否开启滚动动画        | boolean                    | true         | --   |
| onPrevClick    | 上一个点击回调          | function                   | --           | --   |
| onNextClick    | 下一个点击回调          | function                   | --           | --   |
| onItemClick    | 子项点击回调            | function                   | --           | --   |
| prevIcon       | 上一个 Icon 图标        | ReactNode                  | --           | --   |
| nextIcon       | 下一个 Icon 图标        | ReactNode                  | --           | --   |
| direction      | 方向设置(右向左/左向右) | `rtl` \| `ltr`             | --           | --   |
