import React, { FC, CSSProperties, forwardRef } from 'react';
import classNames from 'classnames';

export interface ItemProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  key?: string;
  children?: any;
  onClick?: (key: string) => void;
}

const Item: FC<ItemProps> = (props, ref) => {
  const { prefixCls, className, style, children, onClick, key } = props;

  const handleClick = () => {
    onClick && onClick(key);
  };

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
  );
};

export default forwardRef(Item);
