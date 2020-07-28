import React, { FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { Tag, Popover } from 'antd';
import FlexTags from './flex-tags';
import { ItemData } from './types';

export interface TagsProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  list?: ItemData[];
  max?: number;
  flexible?: boolean;
}

const Tags: FC<TagsProps> = (props) => {
  const { prefixCls, className, style, list = [], max, flexible } = props;

  let showList: ItemData[] = [];
  let ishidden: boolean = false;

  if (list.length <= max) {
    showList = list;
    ishidden = false;
  } else {
    showList = list.slice(0, max - 1);
    ishidden = true;
  }

  const renderTags = (item: ItemData, index: number) => {
    const { text, ...rest } = item;
    return (
      <Tag key={index} {...rest}>
        {text}
      </Tag>
    );
  };

  const renderContent = () => {
    return <>{list.map(renderTags)}</>;
  };

  return flexible ? (
    <FlexTags
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      list={list}
    />
  ) : (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      {showList.map(renderTags)}
      {ishidden && (
        <Popover placement="top" content={renderContent} trigger="hover">
          <Tag>...</Tag>
        </Popover>
      )}
    </div>
  );
};

Tags.defaultProps = {
  prefixCls: 'sen-tags',
  list: [],
  max: 3
};

export default Tags;
