import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';

export interface IInfiniteScrollProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  loader?: React.ReactNode;
  offset?: number;
  loadMore?: () => void;
  onScroll?: () => void;
  // 是否
  initialLoad?: boolean;
}

export interface IState {

}

class InfiniteScroll extends React.Component<IInfiniteScrollProps, IState> {
  static defaultProps = {
    prefixCls: 'ant-plus-infinite-scroll',
    offset: 20
  };

  render() {
    const { className, prefixCls } = this.props;

    return (
      <div
        className={classNames(className, {
          [`${prefixCls}`]: true
        })}
      >

      </div>
    )
  }
}

export default InfiniteScroll;
