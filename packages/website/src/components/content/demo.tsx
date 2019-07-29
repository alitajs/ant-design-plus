import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import numeral from 'numeral';
import antd from 'antd';
// import antDesignPlus from '@alitajs/antd-plus';
import { Location } from 'history';
import classNames from 'classnames';
import { IFrontMatterData } from '@/templates/interface';

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

const requireLib = path => {
  console.log(path);
  const libs = path.split('/');
  // if (libs[0] === '@alitajs/antd-plus') {
  //   return antDesignPlus[libs.pop()];
  // }
  if (libs[0] === 'react') {
    return React;
  }
  if (libs[0] === 'antd') {
    return antd;
  }
  if (libs[0] === 'numeral') {
    return numeral;
  }
  if (libs[0] === 'moment') {
    return moment;
  }
};

class Demo extends React.Component<IProps, IState> {
  private dom: HTMLElement;
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
    this.componentWillReceiveProps(this.props);

    // const myRender = new Function('React', 'ReactDOM', 'require', 'mountNode', preview);
    // if (this.dom) {
    //   myRender(React, ReactDOM, requireLib, this.dom);
    // }

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
