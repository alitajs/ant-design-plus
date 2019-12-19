import React, { FC, CSSProperties, RefObject, useRef, useEffect, useState } from 'react';
import classNames from '@pansy/classnames';
import useToggle from '@pansy/hooks/dist/use-toggle';
import useFullscreen from '@pansy/hooks/dist/use-fullscreen';

export interface FullScreenProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  // 目标Ref
  targetRef?: RefObject<Element>;
  // 是否全屏
  isFullScreen?: boolean;
  // 是否整个页面全屏 默认为true
  isBody?: boolean;
  // 全屏状态改变的回调
  onChange?: (status: boolean) => void;
}

const FullScreen: FC<FullScreenProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    children,
    targetRef,
    isFullScreen,
    isBody,
    onChange
  } = props;
  const rootRef = useRef(null);
  const [status, toggle] = useToggle(!!isFullScreen);
  const [domRef, setDomRef] = useState<RefObject<Element>>(undefined);
  const fullscreenStatus = useFullscreen(domRef, status);

  // 设置Ref
  useEffect(() => {
    if (isBody) {
      setDomRef(undefined);
      return;
    }
    setDomRef(targetRef || rootRef);
  }, [props.isBody, props.targetRef]);

  useEffect(() => {
    toggle(!!isFullScreen);
  }, [props.isFullScreen]);

  useEffect(() => {
    onChange && onChange(fullscreenStatus);
  }, [fullscreenStatus]);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      ref={rootRef}
      style={style}
    >
      {children}
    </div>
  );
};

FullScreen.defaultProps = {
  prefixCls: 'ant-plus-full-screen',
  isBody: false,
  isFullScreen: false
};

export default FullScreen;
