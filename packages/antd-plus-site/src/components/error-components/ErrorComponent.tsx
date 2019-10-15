import React from 'react';
import { Button } from 'antd';

export default class ErrorComponent extends React.Component {
  state = {
    fail: false,
  };
  triggerFail = () => {
    this.setState({
      fail: true,
    });
  };
  render() {
    if (this.state.fail) {
      throw new Error('This is an error from render.');
    }
    return (
      <div>
        <span style={{ marginRight: 10 }}>你好</span>
        <Button onClick={this.triggerFail}>触发报错</Button>
      </div>
    );
  }
}
