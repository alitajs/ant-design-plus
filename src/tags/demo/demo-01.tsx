import React, { FC } from 'react';
// @ts-ignore
import { Tags } from '@alitajs/antd-plus';

const SimpleExample: FC = () => {
  return (
    <div>
      <div>手动指定显示标签个数:</div>
      <Tags
        style={{ width: '300px' }}
        list={[
          { text: 'tag1' },
          { text: 'tag2' },
          { text: 'tag3' },
          { text: 'tag4', color: 'red' },
          { text: 'tag5', color: '#87d068' }
        ]}
      />
      <br />
      <div>自动显示标签:</div>
      <Tags
        flexible
        style={{ width: '145px' }}
        list={[
          { text: 'tag1' },
          { text: 'tag2' },
          { text: 'tag3' },
          { text: 'tag4', color: 'red' },
          { text: 'tag5', color: '#87d068' }
        ]}
      />
    </div>
  );
};

export default SimpleExample;
