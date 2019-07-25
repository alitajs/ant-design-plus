import React from 'react';
import { Row, Col, Affix, Alert } from 'antd';
import Demo from './demo';
import { ILocalizedPageData } from './main-content';
import EditButton from '@/components/edit-button';
import styles from './article.module.less';

interface IProps {
  doc: ILocalizedPageData;
  demos: any;
}

interface IState {
  affixMode: boolean;
  expand: boolean;
}

class ComponentDoc extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  getShowDemos = (localTitle) => {
    const leftChildren = [];
    const rightChildren = [];
  };

  render() {
    const { doc } = this.props;
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

        </Row>
      </article>
    )
  }
}

export default ComponentDoc;
