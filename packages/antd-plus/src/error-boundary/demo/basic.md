---
order: 0
title: 基本用法
---

```jsx
<div>
  <ErrorBoundary Fallback={Fallback}>
    <ErrorComponent />
  </ErrorBoundary>
  <div style={{ marginTop: 10 }}>不会受影响</div>
</div>
```
