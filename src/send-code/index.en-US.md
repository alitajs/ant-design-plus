---
title: SendCode 发送验证码
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
  order: 10
---

## 代码演示

### 普通调用

<code src="./demo/simple.tsx" />

### 自定义倒计时按钮

<code src="./demo/customize.tsx" />

### 刷新页面倒计时继续

<code src="./demo/demo-03.tsx" />

## API

### SendCode

| 属性       | 说明                                                                         | 类型    | 默认值             |
| ---------- | ---------------------------------------------------------------------------- | ------- | ------------------ |
| start      | 是否开始倒计时                                                               | boolean | false              |
| second     | 倒计时时长（秒）                                                             | number  | 60                 |
| initText   | 初始化按钮显示文本                                                           | string  | '获取验证码'       |
| runText    | 运行时显示文本                                                               | string  | '{%s}秒后重新获取' |
| resetText  | 运行结束后显示文本                                                           | string  | '重新获取验证码'   |
| storageKey | 储存倒计时剩余时间 sessionStorage 的键值，设置不为空后，刷新页面倒计时将继续 | string  | -                  |
