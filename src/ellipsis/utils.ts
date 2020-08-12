import { TooltipProps } from 'antd/es/tooltip';
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import { TooltipType } from './interface';

/**
 * 获取字符长度，全角字符的长度为2
 * @param str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

/**
 *
 * @param str
 * @param maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0;
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

export const getTooltipProps = (tooltip: TooltipType): Partial<TooltipProps> | undefined => {
  if (isBoolean(tooltip)) {
    return tooltip ? {} : undefined;
  }

  if (isObject(tooltip)) {
    return { ...tooltip } as Partial<TooltipProps>;
  }

  return undefined;
};
