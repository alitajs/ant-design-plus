import React, { FC, CSSProperties } from 'react';
import { Tag, Popover } from 'antd';
import { ItemData } from './types';
import useWindowSize from '@pansy/hooks/es/use-window-size';
import { useMeasureBatch, useMeasure } from '../common/hooks/use-measure';

export interface FlexTagsProps {
  className?: string;
  style?: CSSProperties;
  list?: ItemData[];
}

function findIndex(tagsWidth: number[], maxWidth: number) {
  let index = -1;
  let count = 0;
  for (let i = 0; i < tagsWidth.length; ++i) {
    if (tagsWidth[i] + count <= maxWidth) {
      count += tagsWidth[i];
      index = i;
    } else {
      break;
    }
  }

  return index;
}

const FlexTags: FC<FlexTagsProps> = (props) => {
  const { list = [], ...rest } = props;
  //支持响应式
  const { width } = useWindowSize();
  const wrapMeasure = useMeasure([width]);
  const tagsMeasure = useMeasureBatch(list.length, [width]);
  const hideMenuPos =
    findIndex(
      tagsMeasure.map((i) => i?.rect?.width), //tag有一个8px的间距
      wrapMeasure.rect.width - 35 //35是那个...的tag
    ) + 1;

  const needHidden = hideMenuPos < list.length;
  const renderTags = (item: ItemData, index: number, ref?: any) => {
    const { text, ...rest } = item;
    return (
      <span key={index} ref={ref}>
        <Tag {...rest}>{text}</Tag>
      </span>
    );
  };
  const renderContent = () => {
    return <>{list.map((i, idx) => renderTags(i, idx))}</>;
  };
  return (
    <div ref={wrapMeasure.ref} {...rest}>
      {list.slice(0, hideMenuPos).map((i, idx) => renderTags(i, idx, tagsMeasure[idx]?.ref))}
      {needHidden && (
        <Popover placement="top" content={renderContent} trigger="hover">
          <Tag>...</Tag>
        </Popover>
      )}
    </div>
  );
};

export default FlexTags;
