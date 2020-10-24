import React, { FC } from 'react';
import { DaysRange } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <div>
      <DaysRange
        marks={[1, 30, 7]}
        onChange={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
};

export default Example;
