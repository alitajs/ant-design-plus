import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import isStyleSupport from 'antd/es/_util/styleChecker';
import { TooltipProps } from 'antd/es/tooltip';
import isBoolean from 'lodash/isBoolean';
import { ConfigContext } from '../config-provider';
import EllipsisText from './ellipsis-text';
import { TooltipType } from './interface';
import { getTooltipProps } from './utils';

interface EllipsisProps {
  /**
   * 额外的样式类
   */
  className?: string;
  /**
   * 额外样式
   */
  style?: React.CSSProperties;
  /**
   * 限制宽度大小
   */
  width?: string | number;
  /**
   * 最大显示的行数，超出则截取省略
   */
  lines?: string;
  /**
   * 显示的字符的最大长度，超过则截取省略
   */
  length?: number;
  /**
   * 设置是否使用tooltip或者tooltip的属性，设置为fasle则不显示tooltip
   */
  tooltip?: TooltipType;
  /**
   * 是否按照全角字符的长度视为2来计算字符串长度
   */
  fullWidthRecognition?: boolean;
}

const isLineClampSupport = isStyleSupport('webkitLineClamp');

const Ellipsis: React.FC<EllipsisProps> = ({
  className,
  style,
  lines,
  width,
  length,
  tooltip,
  children,
  fullWidthRecognition
}) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLSpanElement>(null);
  const shadowRef = React.useRef<HTMLDivElement>(null);
  const shadowChildrenRef = React.useRef<HTMLDivElement>(null);

  const [text, setText] = React.useState<string>('');
  const [targetCount, setTargetCount] = React.useState<number>(0);

  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('ellipsis');
  const cls = classNames(`${prefixCls}-ellipsis`, className, {
    [`${prefixCls}-width-mode`]: width,
    [`${prefixCls}-line`]: lines && !isLineClampSupport,
    [`${prefixCls}-lineClamp`]: lines && isLineClampSupport
  });

  if (length) {
    return (
      <EllipsisText
        tooltip={tooltip}
        length={length}
        text={(children || '') as string}
        fullWidthRecognition={fullWidthRecognition}
      />
    );
  }

  const childNode = (
    <span ref={handleRef}>
      {targetCount > 0 && text.substring(0, targetCount)}
      {targetCount > 0 && targetCount < text.length && '...'}
    </span>
  );

  return (
    <div ref={rootRef} className={cls}>
      <div ref={contentRef}>
        {tooltip ? (
          <Tooltip overlayClassName={`${prefixCls}-tooltip`} title={text}>
            {childNode}
          </Tooltip>
        ) : (
          childNode
        )}
        <div className={`${prefixCls}-shadow`} ref={shadowChildrenRef}>
          {children}
        </div>
        <div className={`${prefixCls}-shadow`} ref={shadowRef}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

Ellipsis.defaultProps = {
  tooltip: true,
  fullWidthRecognition: false
};

export default Ellipsis;
