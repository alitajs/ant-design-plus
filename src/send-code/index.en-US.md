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

# SendCode 发送验证码

发送手机、邮箱验证码倒计时效果

## 代码演示

### 简单使用

<code src="./demo/simple.tsx" />

### 自定义文本

<code src="./demo/customize.tsx" />

## API

### SendCode

| Property  | Description        | Type    | Default            |
| --------- | ------------------ | ------- | ------------------ |
| start     | 是否开始倒计时     | boolean | false              |
| second    | 倒计时时长（秒）   | number  | 60                 |
| initText  | 初始化按钮显示文本 | string  | '获取验证码'       |
| runText   | 运行时显示文本     | string  | '{%s}秒后重新获取' |
| resetText | 运行结束后显示文本 | string  | '重新获取验证码'   |
