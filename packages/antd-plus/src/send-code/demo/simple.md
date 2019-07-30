---
order: 0
title: 基础样例
---

Simplest of usage.

```jsx
import React from 'react';
import { SendCode } form '@alitajs/antd-plus';

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false
    }
  }

  handleClick = () => {
    this.setState({
      start: true
    })
  };

  render() {
    const { start } = this.state;
    return (
      <SendCode
        start={start}
        onClick={this.handleClick}
      />
    )
  }
}

ReactDOM.render(
  <BasicExample />,
  mountNode
);
```
