import React from 'react';
import classNames from 'classnames';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';

export interface ITablePlusProps<T> extends TableProps<T> {

}

interface ITablePlusState {

}

class TablePlus<T> extends React.Component<ITablePlusProps<T>, ITablePlusState> {
  private prefixCls: string = 'ant-plus-table';

  constructor(props) {
    super(props)

  }

  render() {
    const { className, style, ...restProps } = this.props;
    return (
      <div
        className={classNames(className, {
          [`${this.prefixCls}`]: true
        })}
        style={style}
      >
        <Table {...restProps} />
      </div>
    )
  }
}

export default TablePlus;
