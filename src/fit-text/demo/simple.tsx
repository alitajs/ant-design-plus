import React, { FC } from 'react';
import { FitText } from '@alitajs/antd-plus';
import './simple.less';

const Example: FC = () => {
  return (
    <div className="fit-text-demo">
      <div style={{ width: '30%' }}>
        <FitText>
          <h1>Hello World!</h1>
        </FitText>
      </div>
      <div style={{ width: '70%' }}>
        <FitText>
          <h1>Hello World!</h1>
        </FitText>
      </div>
    </div>
  );
};

export default Example;
