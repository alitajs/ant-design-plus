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
      second={15}
      initText="点击"
      runText="剩余{%s}秒"
      onClick={handleClick}
      resetText="重新发送"
      onEnd={() => {
        setStart(false);
      }}
    />
  );
};

export default Example;
