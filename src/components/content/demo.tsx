import React from 'react';
import ReactDOM from 'react-dom';
import { Location } from 'history';
import classNames from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DOCS_DEFAULT_CONFIG } from '@/config';
import EditButton from '@/components/edit-button';
import { IFrontMatterData } from '@/templates/interface';

interface IProps {
  id: string;
  expand?: boolean;
  preview?: string;
  style?: string;
  meta?: IFrontMatterData;
  content?: string;
  location?: Location;
  highlightedCode?: string;
}

interface IState {
  // 代码是否折叠
  codeExpand: boolean;
  // 源代码
  sourceCode: string;
  // 拷贝
  copied: boolean;
  // 拷贝提示是否可见
  copyTooltipVisible: boolean;
}

class Demo extends React.Component<IProps, IState> {
  private dom: HTMLElement;
  private anchor: HTMLElement;
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      codeExpand: false,
      sourceCode: '',
      copyTooltipVisible: false
    }
  }

  componentDidMount() {
    const { meta, location, preview } = this.props;

  }

  componentWillReceiveProps(nextProps: IProps) {
    const { highlightedCode } = nextProps;
    const div = document.createElement('div');
    div.innerHTML = highlightedCode;
    this.setState({
      sourceCode: div.textContent
    });
  }

  render() {
    const { codeExpand } = this.state;
    const { id, style, meta, content } = this.props;
    const localizedTitle = meta.title['zh-CN'];
    const localizeIntro = content || localizedTitle;

    return (
      <section
        className={classNames({
          'code-box': true,
          expand: codeExpand,
        })}
        id={id}
      >
        <section className="code-box-demo">
          <div ref={ref => (this.dom = ref)} />
          {style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <a href={`#${id}`} ref={ref => (this.anchor = ref)}>
              {localizedTitle}
            </a>
            <EditButton
              title="在 Github 上编辑此页！"
              filename={meta.path}
              sourcePath={DOCS_DEFAULT_CONFIG.sourcePath}
            />
          </div>
          <div
            className="code-box-description"
            dangerouslySetInnerHTML={{ __html: localizeIntro }}
          />
        </section>
      </section>
    )
  }
}

export default Demo;
