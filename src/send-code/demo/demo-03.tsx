import React, { FC, useState } from 'react';
// @ts-ignore
import { SendCode } from '@alitajs/antd-plus';

const Example: FC = () => {
  const [start, setStart] = useState(false);

  function handleClick() {
    setStart(true);
  }

  return (
    <SendCode
      start={start}
      storageKey="plus-send-code"
      onClick={handleClick}
      initText="刷新页面倒计时还会继续"
      onEnd={() => {
        setStart(false);
      }}
    />
  );
};

export default Example;
