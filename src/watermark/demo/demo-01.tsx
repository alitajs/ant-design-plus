import React from 'react';
import { Button } from 'antd';
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <Watermark style={{ width: '100%', height: 500 }} text="测试水印">
      <div>
        <Button type="primary">确认</Button>
      </div>
    </Watermark>
  );
};
