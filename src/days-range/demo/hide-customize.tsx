import React, { FC } from 'react';
import { isNumber } from 'lodash';
// @ts-ignore
import { DaysRange } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <div>
      <DaysRange
        showCustomize={false}
        onChange={(data) => {
          console.log(data);
        }}
        formatter={(val) => {
          if (isNumber(val)) {
            return `近${val}天`;
          }
          return undefined;
        }}
      />
    </div>
  );
};

export default Example;
