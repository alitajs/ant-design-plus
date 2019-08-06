import React from 'react';
import { getScreenFullFunMap, IFunMap } from './utils';

export interface IFullScreenProps {
  className?: string;
  style?: React.CSSProperties;
  // 是否全屏，默认为false
  isFullScreen?: boolean;
}

const keyboardAllowed = (typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element);

class FullScreen extends React.Component<IFullScreenProps> {
  readonly funMap: IFunMap | boolean;
  private root: HTMLElement;
  static defaultProps = {
    isFullScreen: false
  };

  constructor(props) {
    super(props);
    this.funMap = getScreenFullFunMap();
  }

  componentWillReceiveProps(nextProps: IFullScreenProps) {
    this.toggle(nextProps.isFullScreen);
  }

  // 切换到全屏
  request = () => {
    if (typeof this.funMap === 'boolean') return null;
    const { children } = this.props;
    const element = children ? this.root : document.documentElement;
    const request = this.funMap.requestFullscreen;
    return new Promise(function (resolve, reject) {
      let promise;

      if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
        promise = element[request]();
      } else {
        promise = element[request](keyboardAllowed ? Element['ALLOW_KEYBOARD_INPUT'] : {});
      }

      Promise.resolve(promise).catch(reject);
    })
  };

  // 退出全屏
  exit = () => {
    const isFullScreen = this.getIsFullScreen();
    if (typeof this.funMap === 'boolean') return null;
    const exit = this.funMap.exitFullscreen;
    return new Promise(function (resolve) {

      if (!isFullScreen) {
        resolve();
        return;
      }

      document[exit]();
    });
  };

  // 切换全屏状态
  toggle = (isFullScreen) => {
    isFullScreen ? this.exit() : this.request();
  };

  getIsFullScreen = () => {
    if (typeof this.funMap === 'boolean') return false;
    return !!document[this.funMap.fullscreenElement];
  };

  saveRoot = (node) => {
    this.root = node;
  };

  render() {
    const { style, children } = this.props;

    return (
      <div style={style} ref={this.saveRoot}>
        {children}
      </div>
    )
  }
}

export default FullScreen;
