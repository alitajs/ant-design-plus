import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import isStyleSupport from 'antd/es/_util/styleChecker';
import ResizeObserver from 'resize-observer-polyfill';
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
  lines?: number;
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
  const widthNodeRef = React.useRef<HTMLSpanElement>(null);
  const lineClampNodeRef = React.useRef<HTMLDivElement>(null);
  const resizeObserver = React.useRef<any>(null);

  const [text, setText] = React.useState<string>('');
  const [targetCount, setTargetCount] = React.useState<number>(0);
  const [isEllipsisActive, setIsEllipsisActive] = React.useState<boolean>(false);

  const { getPrefixCls } = React.useContext(ConfigContext);

  React.useEffect(() => {
    if (handleRef.current) {
      computeLine();
    }
    if (width || lines) {
      let target;
      if (width) {
        target = widthNodeRef.current;
      } else if (lines && isLineClampSupport) {
        target = lineClampNodeRef.current;
      } else {
        return;
      }
      detectEllipsisActive(target);

      resizeObserver.current = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === target) {
            detectEllipsisActive(target);
          }
        });
      });
      resizeObserver.current.observe(target);
    }

    return () => {
      resizeObserver.current && resizeObserver.current.disconnect();
    };
  }, []);

  const prefixCls = getPrefixCls('ellipsis');
  const cls = classNames(`${prefixCls}-ellipsis`, className, {
    [`${prefixCls}-width-mode`]: width,
    [`${prefixCls}-line`]: lines && !isLineClampSupport,
    [`${prefixCls}-lineClamp`]: lines && isLineClampSupport
  });
  const tooltipProps = getTooltipProps(tooltip);

  const detectEllipsisActive = (node: HTMLElement) => {
    setIsEllipsisActive(
      node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth
    );
  };

  /**
   *
   *
   */
  const computeLine = () => {
    if (lines && !isLineClampSupport) {
      const text = shadowChildrenRef.current.innerText || shadowChildrenRef.current.textContent;
      const lineHeight = parseInt(getComputedStyle(rootRef.current).lineHeight, 10);
      const targetHeight = lines * lineHeight;
      contentRef.current.style.height = `${targetHeight}px`;
      const totalHeight = shadowChildrenRef.current.offsetHeight;
      const shadowNode = shadowRef.current.firstChild;

      if (totalHeight <= targetHeight) {
        setText(text);
        setTargetCount(text.length);
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = bisection(targetHeight, mid, 0, len, text, shadowNode);

      setText(text);
      setTargetCount(count);
    }
  };

  const bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      if (end - begin === 1) {
        mid = 1 + begin;
      } else {
        mid = Math.floor((end - begin) / 2) + begin;
      }
      return bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return bisection(th, mid, begin, end, text, shadowNode);
  };

  // 一种限制都没有返回原值
  if (!lines && !length && !width) {
    return <span className={cls}>{children}</span>;
  }

  // 宽度限制
  if (width) {
    const node = (
      <span ref={widthNodeRef} className={cls} style={{ ...style, maxWidth: width }}>
        {children}
      </span>
    );
    return tooltipProps ? (
      <Tooltip
        {...tooltipProps}
        overlayClassName={`${prefixCls}-tooltip`}
        title={isEllipsisActive ? children : null}
      >
        {node}
      </Tooltip>
    ) : (
      node
    );
  }

  // 字数限制
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

  // 行数限制
  const id = `ant-plus-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;

  if (isLineClampSupport) {
    const style = `#${id}{-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`;

    const node = (
      <div ref={lineClampNodeRef} id={id} className={cls}>
        <style>{style}</style>
        {children}
      </div>
    );

    return tooltipProps ? (
      <Tooltip
        {...tooltipProps}
        overlayClassName={`${prefixCls}-tooltip`}
        title={isEllipsisActive ? children : null}
      >
        {node}
      </Tooltip>
    ) : (
      node
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
