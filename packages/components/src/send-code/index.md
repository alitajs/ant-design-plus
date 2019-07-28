---
title: SendCode
type: 基础组件
subtitle: 发送验证码组件
order: 1
cols: 1
---

## API

### SendCode

| 参数       | 说明             | 类型        | 默认值   |
| --------- | ----------------| ---------- | --------- |
| start     | 是否开始倒计时     | boolean    | false     |
| second    | 倒计时时长（秒）    | number     | 60        |
| initText  | 初始化按钮显示文本  | string      | '获取验证码' |
| runText   | 运行时显示文本     | string      | '{%s}秒后重新获取' |
| resetText | 运行结束后显示文本  | string      | '重新获取验证码' |

