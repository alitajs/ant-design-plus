import React from 'react';
import { Tooltip } from 'antd';
import { ConfigContext } from '../config-provider';
import { TooltipType } from './interface';
import { getStrFullLength, cutStrByFullLength, getTooltipProps } from './utils';

interface EllipsisTextProps {
  className?: string;
  /**
   * 需要处理的文本
   */
  text?: string;
  /**
   * 需要展示的最大长度
   */
  length?: number;
  tooltip?: TooltipType;
  fullWidthRecognition?: boolean;
}

const EllipsisText: React.FC<EllipsisTextProps> = ({
  text,
  length,
  tooltip,
  fullWidthRecognition
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }

  const prefixCls = getPrefixCls('ellipsis');
  const tooltipProps = getTooltipProps(tooltip);

  const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;

  if (textLength <= length || length < 0) {
    return <span>{text}</span>;
  }

  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  if (tooltipProps) {
    return (
      <Tooltip {...tooltipProps} overlayClassName={`${prefixCls}-tooltip`} title={text}>
        <span>
          {displayText}
          {tail}
        </span>
      </Tooltip>
    );
  }

  return (
    <span>
      {displayText}
      {tail}
    </span>
  );
};

export default EllipsisText;
