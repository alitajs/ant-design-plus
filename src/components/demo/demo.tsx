import React from 'react';
import classNames from 'classnames';
import { Tooltip, Icon } from 'antd';
import { IFrontMatterData } from '@site/templates/interface';
import CopyToClipboard from 'react-copy-to-clipboard';
import EditButton from '@site/components/edit-button';
import Playground from '@site/components/playground';

interface IProps {
  id: string;
  // 查看的效果
  preview?: string;
  meta?: IFrontMatterData;
  content?: {
    'zh-CN': string;
    'en-US': string;
  },
  sourceCode?: string;
  // 需要显示的代码
  highlightedCode?: string;
}

interface IState {
  // 代码是否折叠
  codeExpand: boolean;
  // demo源代码
  sourceCode: string;
  copyTooltipVisible: boolean;
  copied: boolean;
}

class Demo extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      codeExpand: false,
      sourceCode: '',
      copyTooltipVisible: false,
      copied: false
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { highlightedCode } = nextProps;
    const div = document.createElement('div');
    div.innerHTML = highlightedCode;
    this.setState({
      sourceCode: div.textContent
    });
  }

  // 切换代码显示/隐藏
  handleCodeExpand = () => {
    const { codeExpand } = this.state;
    this.setState({
      codeExpand: !codeExpand
    });
  };

  handleCodeCopied = () => {
    this.setState({
      copied: true
    });
  };

  onCopyTooltipVisibleChange = visible => {
    if (visible) {
      this.setState({
        copyTooltipVisible: visible,
        copied: false,
      });
      return;
    }
    this.setState({
      copyTooltipVisible: visible,
    });
  };

  render() {
    const { id, meta, highlightedCode, content } = this.props;
    const { codeExpand, sourceCode, copied, copyTooltipVisible } = this.state;

    if (!this.props.preview) {
      return null;
    }

    const localizedTitle = meta.title['zh-CN'] || meta.title;
    const localizeIntro = content['zh-CN'];

    return (
      <section
        className={classNames({
          [`code-box`]: true,
          expand: codeExpand
        })}
      >
        {/** Demo展示 */}
        <section className="code-box-demo">
          <Playground code={sourceCode} />
        </section>

        {/** 描述区域 */}
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <a href={`#${id}`}>
              {localizedTitle}
            </a>
            <EditButton
              title="在github上编辑此页！"
              filename={meta.path.replace('components/', 'packages/antd-plus/src/')}
              sourcePath="https://github.com/alitajs/ant-design-plus/edit/master"
            />
          </div>
          <div
            className="code-box-description"
            dangerouslySetInnerHTML={{ __html: localizeIntro }}
          />
        </section>

        {/** 操作区域 */}
        <div className="code-box-actions">
          <CopyToClipboard text={sourceCode} onCopy={this.handleCodeCopied}>
            <Tooltip
              visible={copyTooltipVisible}
              onVisibleChange={this.onCopyTooltipVisibleChange}
              title={copied ? '复制成功' : '复制代码'}
            >
              <Icon
                type={(copied && copyTooltipVisible) ? 'check' : 'copy'}
                className="code-box-code-copy"
              />
            </Tooltip>
          </CopyToClipboard>
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
