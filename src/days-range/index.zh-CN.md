---
title: DaysRange 天数范围
nav:
  title: 组件
  path: /components
group:
  title: 操作组件
  path: /operation
---

# DaysRange 天数范围

## 代码演示

### 简单使用

<code src="./demo/simple.tsx" />

### 单选风格

<code src="./demo/radio.tsx" />

### 不显示自定义(定制化文本)

<code src="./demo/hide-customize.tsx" />

### 禁用初始执行 onChange

<code src="./demo/disabled-mount-change.tsx" />

### 在表单中使用

<code src="./demo/form1.tsx" />

### 在表单中使用 - 设置自定义时间

<code src="./demo/form.tsx" />

### 快捷日期范围

<code src="./demo/demo-07.tsx" />

## API

| 参数          | 说明                               | 类型                                                             | 默认值   | 版本 |
| ------------- | ---------------------------------- | ---------------------------------------------------------------- | -------- | ---- |
| className     | 额外的样式类                       | string                                                           | --       | --   |
| style         | 额外的样式                         | CSSProperties                                                    | `button` | --   |
| type          | 风格类型                           | `radio` \| `button`                                              | --       | --   |
| buttonStyle   | 风格样式，目前有描边和填色两种风格 | outline \| solid                                                 | outline  | --   |
| showCustomize | 是否显示自定义选择                 | boolean                                                          | true     | --   |
| formatter     | 自定义文本                         | (val: number \| 'customize') => string \| ReactNode \| undefined | --       | --   |
| size          | 大小                               | large \| middle \| small                                         | middle   | --   |

DaysRange

| 参数          | 说明                                | 类型     | 默认值  | 版本   |
| ------------- | ----------------------------------- | -------- | ------- | ------ |
| marks         | 快捷天数数组(大于 0 且为整数)(1 BI) | number[] | [7, 30] | --     |
| value         | 值                                  | number   | --      | --     |
| isMountChange | onChange 是否在初始化时执行         | boolean  | true    | v1.1.2 |

**注意** 开启`isMountChange`后会在 组件注册阶段执行 onChange，默认会将 marks 排序后的第一个值作为初始值

DaysRange.Fast

| 参数  | 说明         | 类型   | 默认值 | 版本    |
| ----- | ------------ | ------ | ------ | ------- |
| marks | 快捷操作数组 | 'day'  | 'week' | 'mouth' | 'year'[] | ['day', 'week', 'mouth'] | -- |
| value | 值           | object | --     | --      |

onChange 回调数据格式

```
{
  startTime: number;
  endTime: number;
}
```
