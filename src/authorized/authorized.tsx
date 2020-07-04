import React, { FC, ReactNode } from 'react';
import Policy from '@pansy/policy';
import isFunction from 'lodash/isFunction';
import checkAuthority, { Authority } from './check-authority';

export interface AuthorizedProps {
  authority?: Authority;
  noMatch?: ReactNode;
  policy?: Policy;
}

const Authorized: FC<AuthorizedProps> = (props) => {
  const { policy, children, authority, noMatch } = props;
  const childrenRender = typeof children === 'undefined' ? null : children;

  // 防止policy不存在报错
  if (!policy) {
    return <>{childrenRender}</>;
  }

  const checkResult = checkAuthority(policy, authority);

  if (isFunction(children)) {
    return <>{children(checkResult)}</>;
  } else {
    return <>{checkResult ? childrenRender : noMatch}</>;
  }
};

Authorized.defaultProps = {
  noMatch: null
};

export default Authorized;
