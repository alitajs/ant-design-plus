import React from 'react';
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
  buttons: ActionButtonProps[];
  maxCount?: number;
}
const ButtonList: React.FC<ButtonListProps> = ({ prefixCls, className, buttons, maxCount }) => {
  if (buttons || buttons.length === 0) return null;
  if (maxCount && buttons.length < maxCount) {
    return (
      <div className={classNames(className, prefixCls)}>
        {buttons.map((action, index) => (
          <Button key={index} type={action.type} onClick={action.onClick}>
            {action.text}
          </Button>
        ))}
      </div>
    );
  }
  const displayBtns = buttons.slice(0, maxCount);
  const dropdowns = buttons.slice(maxCount);
  return (
    <div className={classNames(className, prefixCls)}>
      {displayBtns.map((button, index) => (
        <Button key={index} type={button.type} onClick={button.onClick}>
          {button.text}
        </Button>
      ))}
      {dropdowns.length > 0 && (
        <Dropdown
          overlay={
            <Menu>
              {dropdowns.map((item, index) => (
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
