import React, { FC } from 'react';
// @ts-ignore
import { Authorized } from '@alitajs/antd-plus';
import Policy from '@pansy/policy';

const Auth = (props) => {
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
    <div>
      <Auth authority="*">{(isMatch) => <span>权限校验结果: {isMatch + ''}</span>}</Auth>
      <br />
      <Auth authority="module2/action1">
        {(isMatch) => <span>权限校验结果: {isMatch + ''}</span>}
      </Auth>
    </div>
  );
};

export default Example;
