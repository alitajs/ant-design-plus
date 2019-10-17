import React from 'react';
import { Policy, isArray, isNil, isString } from '@alitajs/autils';

export type TAuthority = string[] | string;

export interface AuthorizedProps {
  authority?: TAuthority;
  noMatch?: React.ReactNode;
  policy?: Policy;
}

const Authorized: React.FC<AuthorizedProps> = ({
  policy,
  children,
  authority,
  noMatch
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;

  /**
   * 权限检查方法
   * @param { 权限判定 | Permission judgment } authority
   * @param { 通过的组件 | Passing components } target
   * @param { 未通过的组件 | no pass components } Exception
   * @param { 权限验证方法 | no pass components } policy
   */
  const checkPermissions = (
    authority?: TAuthority,
    target?: React.ReactNode,
    Exception?: React.ReactNode,
    policy?: Policy
  ) => {
    if (!policy) {
      return target;
    }

    // 没有判定权限.默认查看所有
    if (isNil(authority)) {
      return target;
    }

    // 数组处理
    if (isArray(authority)) {
      if (policy.multipleVerify(authority)) {
        return target;
      } else {
        return Exception;
      }
    }

    // string 处理
    if (isString(authority)) {
      if (policy.combinationVerify(authority)) {
        return target;
      } else {
        return Exception;
      }
    }

    throw new Error('unsupported parameters');
  };

  return checkPermissions(
    authority,
    childrenRender,
    noMatch,
    policy
  ) as React.ReactElement;
};

Authorized.defaultProps = {
  noMatch: null
};

export default Authorized;
