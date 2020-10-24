import React, { FC } from 'react';
import { Button } from 'antd';
import { Authorized } from '@alitajs/antd-plus';
import Policy from '@pansy/policy';

const Auth = (props: any) => {
  const actions = [
    { module: 'module1', action: 'action1' },
    { module: 'module1', action: 'action2' },
    { module: 'module1', action: 'action3' },
    { module: 'module2', action: 'action1' },
    { module: 'module2', action: 'action2' }
  ];
  const policy = new Policy(actions);

  policy.addPolicy({
    version: 1,
    statement: [
      {
        effect: 'allow',
        action: ['module1/*']
      }
    ]
  });

  return <Authorized {...props} policy={policy} />;
};

const Example: FC = () => {
  return (
    <div className="authorized-demo">
      <Auth authority="*">
        <Button type="primary">操作1</Button>
      </Auth>

      <Auth authority="module1/action1">
        <Button style={{ margin: '0 16px' }} type="primary">
          操作2
        </Button>
      </Auth>

      <Auth authority="module2/action1" noMatch="no auth">
        <Button type="primary">操作2</Button>
      </Auth>
    </div>
  );
};

export default Example;
