---
order: 1
title: Commit信息规范
type: Specification
---

## 提交信息格式

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

提交信息应该包含Header(必填)、Body(选填)和Footer(选填)

## Header

```
<type>(<scope>): <subject>
```

### type

用来説明commit的类别, 可选值如下

* `feat`: 新功能
* `fix`: BUG修复
* `docs`: 文档
* `style`: 代码格式(不影响代码运行的变动)
* `refactor`: 重构
* `test`: 关于测试
* `chore`: 构建过程或辅助工具的变动
* `revert`: 还原代码
  
### scope

表示影响的范围 选填
  
### subject

commit 目的的简短描述

## Body

本次 commit 的详细描述，可以分成多行

## Footer

只用于两种情况 关联Issue 和 关闭Issue

关联Issue:
  格式: Issue #1, #2, #3
关闭Issue:
  格式: Close #1, #2, #3
  
## 示例

```
feat(document module): 添加**功能
 
详细説明

- 功能1
- 功能2

Issue #1, #2
Close #1
```
