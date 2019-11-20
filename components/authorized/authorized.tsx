import React, { Fragment } from 'react';
import isFunction from '@pansy/is-function';
import { checkAuthority, Authority, Policy } from './check-authority';

export interface AuthorizedProps {
  authority?: Authority;
  noMatch?: React.ReactNode;
  policy?: Policy;
}

const Authorized: React.FC<AuthorizedProps> = (props) => {
  const {
    policy,
    children,
    authority,
    noMatch
  } = props;
  const childrenRender = typeof children === 'undefined' ? null : children;

  const checkResult = checkAuthority(policy, authority);

  if (isFunction(children)) {
    return (
      <Fragment>
        {children(checkResult)}
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        {checkResult ? childrenRender : noMatch}
      </Fragment>
    );
  }
};

Authorized.defaultProps = {
  noMatch: null
};

export default Authorized;
