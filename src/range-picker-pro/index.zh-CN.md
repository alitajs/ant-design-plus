---
title: RangePickerPro 时间范围选择增强版
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
---

# RangePickerPro 时间范围选择增强版

基于 AndDesign RangePicker 组件 提供禁用逻辑

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

### 切换类型

<code src="./demo/demo-02.tsx" />

### 默认时间

<code src="./demo/demo-03.tsx" />

## API

文本链接的属性说明如下：

| 参数               | 说明                                                                    | 类型                                           | 默认值   | 版本 |
| ------------------ | ----------------------------------------------------------------------- | ---------------------------------------------- | -------- | ---- |
| periodType         | 间隔类型                                                                | `month` \| `day` \| `hour` \| `minute`         | `minute` | --   |
| periodValue        | 间隔的值，必须为整数，且不可超过类型的最大数，比如 minute 只能为 1 - 59 | `month` \| `day` \| `hour` \| `minute`         | `minute` | --   |
| disabledSelect     | 禁用类型切换                                                            | boolean                                        | `true`   | --   |
| disabledAfterToday | 是否禁用今天之后的日期                                                  | boolean                                        | `true`   | --   |
| defaultTimes       | 默认的时间，设置则会触发`onChange`                                      | `RangePickerProps['value']`                    | --       | --   |
| options            | 选择项配置                                                              | `{ value: PeriodType, label: string }[]`       | --       | --   |
| value              | 值                                                                      | `{ period: PeriodType; rangeTime: number[]; }` | --       | --   |
| onChange           | 值修改的回调                                                            | `(value) => void`                              | --       | --   |
