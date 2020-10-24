import React from 'react';
import { DaysRange } from '@alitajs/antd-plus';

export default () => {
  return (
    <DaysRange.Fast
      onChange={(data) => {
        console.log(data);
      }}
    />
  );
};
