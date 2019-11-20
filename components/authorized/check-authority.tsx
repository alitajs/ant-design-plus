import React from 'react';
import Policy from '@pansy/policy';
import isArray from '@pansy/is-array';
import isString from '@pansy/is-string';

export type TAuthority = string[] | string;

/**
 * 权限检查方法
 * @param { 权限判定 | Permission judgment } authority
 * @param { 权限验证方法 | no pass components } policy
 */
export const checkAuthority = (policy?: Policy, authority?: TAuthority): boolean => {
  let result = true;

  // 数组处理
  if (isArray(authority)) {
    if (!policy.multipleVerify(authority)) {
      result = false;
    }
  }

  // string 处理
  if (isString(authority)) {
    if (!policy.combinationVerify(authority)) {
      result = false;
    }
  }

  return result;
};
