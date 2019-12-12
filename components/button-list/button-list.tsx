import React, { useState } from 'react';
import classNames from '@pansy/classnames';
import { Button, Dropdown, Menu, Icon } from 'antd';
import { ButtonSize, ButtonProps } from 'antd/lib/button';

export interface ActionButtonProps extends ButtonProps {
  text: string;
  onClick: (params?: unknown) => void;
}

export interface ButtonListProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  list: ActionButtonProps[];
  // button 大小
  size?: ButtonSize;
  maxCount?: number;
  // 自定义更多操作节点
  more?: React.ReactNode;
  moreType?: 'text' | 'icon';
  isLink?: boolean;
}

const ButtonList: React.FC<ButtonListProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    list = [],
    size,
    isLink,
    more,
    moreType,
    maxCount
  } = props;
  const [buttons, setButtons] = useState<ActionButtonProps[]>([]);
  const [menus, setMenus] = useState<ActionButtonProps[]>([]);

  React.useEffect(() => {
    if (list.length > maxCount) {
      let buttons = list.slice(0, maxCount);
      buttons = buttons.map(item => Object.assign(item, { size }));
      setButtons(buttons);
      setMenus(list.slice(maxCount))
    } else {
      setButtons(list);
    }
  }, [props.list]);

  const moreRender = () => {
    if (more) {
      return more;
    }
    if (moreType === 'text') {
      return (
        <span>
          更多操作<Icon type="down" />
        </span>
      )
    }
    return (
      <span>
        <Icon type="more" />
      </span>
    )
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`is-link`]: isLink
      })}
      style={style}
    >
      {(buttons.length > 0) && (
        buttons.map((item, index) => {
          const { text, type, className, ...buttonProps } = item;

          return (
            <Button
              key={index}
              {...buttonProps}
              type={isLink ? 'link' : type}
              className={classNames(className, {
                [`${prefixCls}__button-${type}`]: isLink
              })}
            >
              {text}
            </Button>
          )
        })
      )}
      {(menus.length > 0) && (
        <Dropdown
          overlay={
            <Menu>
              {menus.map((item, index) => (
                <Menu.Item
                  key={index}
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.text}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button
            size={size}
            type={isLink ? 'link' : 'default'}
          >
            {moreRender()}
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

ButtonList.defaultProps = {
  prefixCls: 'ant-plus-button-list',
  maxCount: 3,
  size: 'default',
  isLink: false,
  moreType: 'text'
};

export default ButtonList;
