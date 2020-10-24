import React, { FC, useState } from 'react';
import { Fullscreen } from '@alitajs/antd-plus';

const Example: FC = () => {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  return (
    <div>
      <Fullscreen enabled={enabled}>
        <img
          onClick={handleClick}
          src="https://aip.bdstatic.com/portal-pc-node/dist/1568277945052/images/technology/face/detect/demo-card-1.jpg"
          style={{ width: '100%', height: '100%' }}
        />
      </Fullscreen>
    </div>
  );
};

export default Example;
