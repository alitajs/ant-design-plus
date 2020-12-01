import React from 'react';
import { Watermark } from '@alitajs/antd-plus';

export default () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }} >
      <Watermark text={['张某某', '2020-08-08 12:00:00']} />
    </div>
  );
};
