import Policy from '@pansy/policy';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

// 权限
export type Authority = string[] | string;

/**
 * 权限检查方法
 * @param { 权限判定 | Permission judgment } authority
 * @param { 权限验证方法 | no pass components } policy
 */
const checkAuthority = (policy: Policy, authority: Authority): boolean => {
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

export default checkAuthority;
