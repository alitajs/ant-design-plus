/**
 * title: 自适应展示标签
 * desc: 通过计算容器宽度，自己计算需要展示的标签。可通过改变浏览器大小查看效果
 */
import React, { FC } from 'react';
import { Tags } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <Tags
      flexible
      style={{ width: '100%' }}
      list={[
        { text: 'tag01' },
        { text: 'tag02' },
        { text: 'tag03' },
        { text: 'tag04' },
        { text: 'tag05' },
        { text: 'tag06' },
        { text: 'tag07' },
        { text: 'tag08' },
        { text: 'tag09' },
        { text: 'tag10' },
        { text: 'tag11' },
        { text: 'tag12' },
        { text: 'tag13' },
        { text: 'tag14' },
        { text: 'tag15' },
        { text: 'tag16' },
        { text: 'tag17' },
        { text: 'tag18' },
        { text: 'tag19', color: 'red' },
        { text: 'tag20', color: '#87d068' }
      ]}
    />
  );
};

export default Example;
