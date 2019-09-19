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
    if (list.length > maxCount) {
      let buttons = list.slice(0, maxCount);
      buttons.map(item => Object.assign(item, { size }));
      setButtons(buttons);
      setMenus(list.slice(maxCount))
    } else {
      setButtons(list);
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
      {(buttons.length > 0) && (
        buttons.map((button, index) => (
          <Button key={index} type={button.type} onClick={button.onClick}>
            {button.text}
          </Button>
        ))
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
            size={size}
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
