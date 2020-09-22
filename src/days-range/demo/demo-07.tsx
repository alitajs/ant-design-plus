import React from 'react';
// @ts-ignore
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
