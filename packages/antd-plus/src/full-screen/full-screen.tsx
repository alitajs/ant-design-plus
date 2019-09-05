import React, { RefObject, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import useToggle from 'react-use/esm/useToggle';
import useFullScreen from 'react-use/esm/useFullscreen';

export interface IFullScreenProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  isBody?: boolean;
  targetRef?: RefObject<Element>;
  onChange: (isFullScreen: boolean) => void;
}

const FullScreen: React.FC<IFullScreenProps> = (props) => {
  const { prefixCls, className, style, children, onChange, isBody, targetRef } = props;
  const rootRef = useRef(null);
  const [status, toggle] = useToggle( false);
  const [domRef, setDomRef] = useState<RefObject<Element>>({ current: null });
  const isFullScreen = useFullScreen(domRef, status, {
    onClose: () => toggle(false)
  });

  useEffect(() => {
    if (isBody) {
      setDomRef({ current: document.documentElement });
    } else if (targetRef) {
      setDomRef(targetRef);
    } else {
      setDomRef(rootRef);
    }
  }, [props.isBody, props.targetRef]);

  const changeFullScreen = () => {
    toggle();
    onChange && onChange(isFullScreen);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      ref={rootRef}
      style={style}
      onClick={changeFullScreen}
    >
      {children}
    </div>
  )
};

FullScreen.defaultProps = {
  prefixCls: 'ant-plus-full-screen',
  isBody: false
};

export default FullScreen
