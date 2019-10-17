import React, { Fragment } from 'react';
import { Policy, isFunction } from '@alitajs/autils';
import { checkAuthority, TAuthority } from './check-authority';

export interface AuthorizedProps {
  authority?: TAuthority;
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
