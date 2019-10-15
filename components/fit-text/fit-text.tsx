import React from 'react';

export interface IFitTextProps {
  // 通过调整这个变量来增加/减少字体大小
  compressor?: number;
  // 最小的字体大小
  minFontSize?: number;
  // 最大的字体大小
  maxFontSize?: number;
  children: React.ReactNode;
}

class FitText extends React.Component<IFitTextProps> {
  private updateQueued: boolean = false;
  private _childRef: React.ReactNode;
  private nodes = new Map();

  static defaultProps = {
    compressor: 1,
    minFontSize: Number.NEGATIVE_INFINITY,
    maxFontSize: Number.POSITIVE_INFINITY
  };

  componentWillMount() {
    if (!this.updateQueued) {
      window.requestAnimationFrame(this.handleBodyResize);
    }

    window.addEventListener('resize', this.handleBodyResize);
    window.addEventListener('load', this.handleBodyResize);
  }

  componentDidUpdate() {
    this.handleBodyResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleBodyResize);
    window.removeEventListener('load', this.handleBodyResize);
  }

  updateElementStyle = (
    element: HTMLElement,
    options,
    width: number
  ) => {
    element.style.fontSize = `${Math.min(Math.max(width / (options.compressor * 10), options.minFontSize), options.maxFontSize)}px`;
  };

  handleBodyResize = () => {
    this.updateQueued = true;
    const widths = [];

    this.nodes.forEach((options, element) => {
      widths.push(element.offsetWidth);
    });
    let i = 0;
    this.nodes.forEach((options, element) => {
      this.updateElementStyle(element, options, widths[i]);
      i += 1;
    });
  };

  _renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      return React.cloneElement(child as any, {
        ref: (c) => {
          if (c) {
            this.nodes.set(c, this.props);
          }
          this._childRef = c;
        }
      })
    })
  };

  render() {
    return this._renderChildren()[0];
  }
}

export default FitText;
