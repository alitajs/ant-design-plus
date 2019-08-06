import React from 'react';
import { getScreenFullFunMap } from './utils';

interface IFunMap {
  requestFullscreen: string;
  exitFullscreen: string;
  fullscreenElement: string;
  fullscreenEnabled: string;
  fullscreenchange: string;
  fullscreenerror: string;
}

export interface IFullScreenProps {
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

  componentDidMount() {
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps: IFullScreenProps) {
    if (nextProps.isFullScreen) {
      this.request();
    } else {
      this.exit();
    }
  }

  request = (
    element: HTMLElement = document.documentElement
  ) => {
    if (typeof this.funMap === 'boolean') return null;
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

  exit = () => {
    const { isFullScreen } = this.props;
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

  saveRoot = (node) => {
    this.root = node;
  };

  render() {
    const { children } = this.props;

    return (
      <div ref={this.saveRoot}>
        {children}
      </div>
    )
  }
}

export default FullScreen;
