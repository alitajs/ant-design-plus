import React, { FC } from 'react';
import { Button } from 'antd';
import { Fullscreen } from '@alitajs/antd-plus';

const Example: FC = () => {
  const [enabled, setEnabled] = React.useState(false);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  return (
    <div>
      <Fullscreen
        enabled={enabled}
        target={document.documentElement}
        onClose={(error) => {
          console.log('close');
        }}
      >
        <Button onClick={handleClick}>切换全屏</Button>
      </Fullscreen>
    </div>
  );
};

export default Example;
