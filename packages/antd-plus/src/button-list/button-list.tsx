import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Dropdown, Menu, Icon } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export interface ActionButtonProps extends ButtonProps {
  text: string;
  onClick: (params?: unknown) => void;
}

export interface ButtonListProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  list: ActionButtonProps[];
  maxCount?: number;
}

const ButtonList: React.FC<ButtonListProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    list = [],
    maxCount
  } = props;
  const [buttons, setButtons] = useState<ActionButtonProps[]>([]);
  const [menus, setMenus] = useState<ActionButtonProps[]>([]);

  const buttonListCls = classNames(className, {
    [`${prefixCls}`]: true
  });

  React.useEffect(() => {
    if (list && list.length && list.length > maxCount) {
      setButtons(list.slice(0, maxCount));
      setMenus(list.slice(maxCount))
    } else {
      setButtons(list);
    }
  }, [props.list]);

  return (
    <div className={buttonListCls} style={style}>
      {(menus.length > 0) && (
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
                <Menu.Item key={index} onClick={item.onClick}>
                  {item.text}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button>
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
};

export default ButtonList;
