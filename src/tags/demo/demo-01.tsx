/**
 * title: 指定展示数量
 * desc: 通过指定标签的数量，进行展示
 */
import React, { FC } from 'react';
// @ts-ignore
import { Tags } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <Tags
      max={4}
      list={[
        { text: 'tag1' },
        { text: 'tag2' },
        { text: 'tag3' },
        { text: 'tag4', color: 'red' },
        { text: 'tag5', color: '#87d068' }
      ]}
    />
  );
};

export default Example;
