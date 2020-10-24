import React, { FC, useState } from 'react';
import { SendCode } from '@alitajs/antd-plus';

const Example: FC = () => {
  const [start, setStart] = useState(false);

  function handleClick() {
    setStart(true);
  }

  return (
    <SendCode
      start={start}
      onClick={handleClick}
      onEnd={() => {
        setStart(false);
      }}
    />
  );
};

export default Example;
