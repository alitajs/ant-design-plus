import React, { FC } from 'react';
// @ts-ignore
import { Ellipsis } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <div>
      <Ellipsis lines={2}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Ellipsis>
    </div>
  );
};

export default Example;
