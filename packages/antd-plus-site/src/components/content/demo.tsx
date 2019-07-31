import React from 'react';
import { Location } from 'history';
import classNames from 'classnames';
import { IFrontMatterData } from '@site/templates/interface';
import Playground from '../playground';

interface IProps {
  id?: string;
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
    this.componentWillReceiveProps(this.props);
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
    const localizeIntro = content['zh-CN'] || localizedTitle;

    console.log(this.props);

    return (
      <section
        className={classNames({
          'code-box': true,
          expand: codeExpand,
        })}
        id={id}
      >
        <section className="code-box-demo">
          <Playground code={this.props.preview} />
          {style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            {localizedTitle}
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
