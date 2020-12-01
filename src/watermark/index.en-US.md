---
title: Watermark 水印
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# Watermark 水印

> 2.5.0 版本存在不兼容修改，请注意

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

### 多行水印

<code src="./demo/demo-02.tsx" />

### 整个页面

<code src="./demo/demo-03.tsx" />

## API

| 参数          | 说明          | 类型                 | 默认值 | 版本 |
| ------------ | --------------| ------------------- | ------ | ---- |
| mode        | 渲染模式      | `interval` \| `repeat`     | `interval`     | `2.1.0`   |
| monitor      | 监听水印元素是否被篡改，被修改或者删除等操作，则重新渲染水印 | `boolean` | `true` | --   |
| text         | 水印文本        | `string` \| `string[]` |  --   | --   |
| zIndex        | 水印层级      | `number`     | `9999`     | `1.0.2`   |
| width        | 单个水印区域宽度  | `number`           | `320`    | --   |
| height      | 单个水印区域高度   | `number`           | `160` | --   |
| opacity      | 透明度          | `number`           |  `0.2`   | --   |
| rotate      | 旋转的角度        | `number`           | `20`     | --   |
| fontSize      | 字体大小          | `number`           |  `14`   | --   |
| fontWeight    | 字体粗细        | --           | `normal`   | --   |
| fontColor      | 字体颜色        | `string`      |  `#727071`   | --   |
| fontFamily    | 规定字体系列      | `string`      | `sans-serif`    | --   |
| textAlign    | 文本对齐设置      | `string`      | `center`    | --   |

