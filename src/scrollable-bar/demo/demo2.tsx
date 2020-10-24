import React, { FC, useEffect, useState } from 'react';
import { ScrollableBar } from '@alitajs/antd-plus';
import './style.less';

const Example: FC = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7'];
  const [activeKey, setActiveKey] = useState(undefined);

  useEffect(() => {
    setActiveKey(data[4]);
  }, []);

  return (
    <ScrollableBar
      key="ScrollableBar-02"
      activeKey={activeKey}
      className="scrollable-bar-demo-02"
      style={{
        width: 400
      }}
    >
      {data.map((item) => (
        <ScrollableBar.Item key={item}>helloworld{item}</ScrollableBar.Item>
      ))}
    </ScrollableBar>
  );
};

export default Example;
