import React from 'react';
import { Location } from 'history';
import { Row } from 'antd';
import { IDemo } from '@site/templates/interface';
import { ILocalizedPageData } from './main-content';
import EditButton from '../edit-button/index';
import Demo from '@site/components/demo';
import styles from './article.module.less';

interface IProps {
  doc?: ILocalizedPageData;
  demos?: IDemo[];
  location?: Location;
}

interface IState {
  affixMode: boolean;
  expand: boolean;
}

class ComponentDoc extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      affixMode: false,
      expand: false
    }
  }

  render() {
    const { doc, demos } = this.props;
    const {
      meta: { title, subtitle, path },
      toc,
      descriptionHtml,
      apiHtml,
    } = doc;

    return (
      <article>
        <section className="markdown">
          <h1>
            {title['zh-CN']}
            <span className={styles.subtitle}>
            {subtitle}
          </span>
            <EditButton
              title="在 Github 上编辑此页！"
              filename={path}
            />
          </h1>
          <section
            className="markdown api-container"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          <p>引用方式</p>
          <pre className="language-jsx">
            <code>
              <span className="token keyword">import </span>
              {`{ ${title['zh-CN']} }`}
              <span className="token keyword"> from </span>
              <span className="token string">{`'@alitajs/antd-plus'`}</span>
              <span className="token punctuation">;</span>
            </code>
          </pre>
          <h2 style={{ marginBottom: 32 }} id="demos">
            代码演示
          </h2>
        </section>
        <Row gutter={16}>
          {demos.map((item, index) => {
            return (
              <Demo {...item} key={index} />
            )
          })}
        </Row>
        <section
          className="markdown api-container"
          dangerouslySetInnerHTML={{ __html: apiHtml }}
        />
      </article>
    )
  }
}

export default ComponentDoc;
