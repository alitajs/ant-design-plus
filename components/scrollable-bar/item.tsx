import React, { FC, CSSProperties } from 'react';
import classNames from '@pansy/classnames';

interface ItemProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}

const Item: FC<ItemProps> = (props) => {
  const { prefixCls, className, style, children } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      {children}
    </div>
  )
}

Item.defaultProps = {
  prefixCls: 'ant-plus-scrollable-bar-item'
}

export default Item;
