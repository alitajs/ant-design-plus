import React, { useState } from 'react';
import classNames from 'classnames';
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
    maxCount
  } = props;
  const [buttons, setButtons] = useState<ActionButtonProps[]>([]);
  const [menus, setMenus] = useState<ActionButtonProps[]>([]);

  React.useEffect(() => {
    let buttons = [...list];
    if (list.length) {
      buttons = buttons.map(item => {
        item.size = size;
        return item;
      })
    }
    if (buttons.length > maxCount) {
      setButtons(buttons.slice(0, maxCount));
      setMenus(buttons.slice(maxCount))
    } else {
      setButtons(buttons);
    }
  }, [props.list]);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`is-link`]: isLink
      })}
      style={style}
    >
      {(menus.length > 0) && (
        buttons.map((item, index) => {
          const { text, ...buttonProps } = item;
          return (
            <Button
              key={index}
              {...buttonProps}
              type={isLink ? 'link' : item.type}
              className={isLink ? `${prefixCls}__button-${item.type}`: ''}
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
                <Menu.Item key={index} onClick={item.onClick} disabled={item.disabled}>
                  {item.text}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button
            size={menus[0].size}
            type={isLink ? 'link' : 'default'}
          >
            更多操作
            <Icon type="down" />
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
  isLink: false
};

export default ButtonList;
