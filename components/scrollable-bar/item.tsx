import React, { FC, CSSProperties, forwardRef } from 'react';
import classNames from '@pansy/classnames';

export type KeyType = string | number;

export interface ItemProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  key: KeyType;
  onClick?: (key: KeyType) => void;
}

const Item: FC<ItemProps> = (props, ref) => {
  const { prefixCls, className, style, children, onClick, key } = props;

  const handleClick = () => {
    onClick && onClick(key);
  }

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      ref={ref}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default forwardRef(Item);
