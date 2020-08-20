import React from 'react';
import { Button } from 'antd';
// @ts-ignore
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <Watermark style={{ width: '100%', height: 500 }} text={['张某某', '2020-08-08 12:00:00']}>
      <div>
        <Button>确认</Button>
      </div>
    </Watermark>
  );
};
