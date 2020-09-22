import React, { FC } from 'react';
// @ts-ignore
import { DaysRange } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <div>
      <DaysRange
        isMountChange={false}
        marks={[5, 20]}
        onChange={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
};

export default Example;
