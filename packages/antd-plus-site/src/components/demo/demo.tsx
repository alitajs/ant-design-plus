import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import Playground from '@site/components/playground';

interface IProps {
  // 查看的效果
  preview?: string;
  // 需要显示的代码
  highlightedCode?: string;
}

interface IState {
  // 代码是否折叠
  codeExpand: boolean;
}

class Demo extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      codeExpand: false
    }
  }

  // 切换代码显示/隐藏
  handleCodeExpand = () => {
    const { codeExpand } = this.state;
    this.setState({
      codeExpand: !codeExpand
    });
  };

  render() {
    const { highlightedCode } = this.props;
    const { codeExpand } = this.state;

    return (
      <section
        className={classNames({
          [`code-box`]: true,
          expand: codeExpand
        })}
      >
        {/** Demo展示 */}
        <section className="code-box-demo">
          <Playground code={this.props.preview} />
        </section>

        {/** 描述区域 */}
        <section className="code-box-meta markdown">

        </section>

        {/** 操作区域 */}
        <div className="code-box-actions">
          <Tooltip title={codeExpand ? 'Hide Code' : 'Show Code'}>
            <span className="code-expand-icon">
              <img
                alt="expand code"
                src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
                className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                onClick={this.handleCodeExpand}
              />
              <img
                alt="expand code"
                src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
                className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                onClick={this.handleCodeExpand}
              />
            </span>
          </Tooltip>
        </div>

        {/** 代码显示区域 */}
        <section
          className={classNames({
            'highlight-wrapper': true,
            'highlight-wrapper-expand': codeExpand,
          })}
          key="code"
        >
          <div className="highlight">
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </div>
        </section>

      </section>
    )
  }
}

export default Demo;
