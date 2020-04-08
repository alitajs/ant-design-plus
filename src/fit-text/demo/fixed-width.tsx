import React, { FC } from 'react';
// @ts-ignore
import { FitText } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <div style={{ width: 300 }}>
      <FitText>
        <h1>Hello World!</h1>
      </FitText>
    </div>
  );
};

export default Example;
