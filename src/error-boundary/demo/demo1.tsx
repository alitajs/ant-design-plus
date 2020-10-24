import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { ErrorBoundary } from '@alitajs/antd-plus';

const ErrorComponent: FC = () => {
  const [fail, setFail] = useState(false);

  if (fail) {
    throw new Error('This is an error from render.');
  }

  return (
    <div>
      <span style={{ marginRight: 10 }}>你好</span>
      <Button
        onClick={() => {
          setFail(true);
        }}
      >
        触发报错
      </Button>
    </div>
  );
};

const Fallback = ({ error, componentStack }: any) => (
  <div>
    <div>对不起，程序出错了</div>
    <div>{componentStack}</div>
  </div>
);

const Example: FC = () => {
  return (
    <div>
      <ErrorBoundary fallback={Fallback}>
        <ErrorComponent />
      </ErrorBoundary>
      <div style={{ marginTop: 10 }}>不会受影响</div>
    </div>
  );
};

export default Example;
