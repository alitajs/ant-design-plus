import React, { FC } from 'react';
import { ButtonList } from '@alitajs/antd-plus';

const Example: FC = () => {
  return (
    <ButtonList
      size="small"
      list={[
        { text: '新增', type: 'primary', onClick: () => console.log(1) },
        { text: '修改', type: 'default', onClick: () => console.log(2) },
        { text: '删除', type: 'dashed', onClick: () => console.log(3) },
        { text: '全选', type: 'default', onClick: () => console.log(4) }
      ]}
    />
  );
};

export default Example;
