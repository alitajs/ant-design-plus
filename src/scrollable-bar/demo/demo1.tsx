import React, { FC } from 'react';
import { Button } from 'antd';
// @ts-ignore
import { ScrollableBar } from '@alitajs/antd-plus';
import './style.less';

const Example: FC = () => {
  const defaultData = [1, 2, 3];
  const [data, setData] = React.useState(defaultData);

  const handleAddClick = () => {
    setData([...data, data.length + 1]);
  };

  const handleResetClick = () => {
    setData(defaultData);
  };

  return (
    <div className="scrollable-bar-demo-01">
      <Button type="primary" onClick={handleAddClick}>
        添加
      </Button>
      <Button onClick={handleResetClick}>重置</Button>
      <br />
      <br />
      <ScrollableBar
        key="ScrollableBar-01"
        style={{
          width: 400
        }}
      >
        {data.map((item, index) => {
          return <ScrollableBar.Item key={`item-${index}`}>helloworld{item}</ScrollableBar.Item>;
        })}
      </ScrollableBar>
    </div>
  );
};

export default Example;
