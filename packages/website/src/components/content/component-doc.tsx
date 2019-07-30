import React from 'react';
import { Location } from 'history';
import { Row } from 'antd';
import Demo from './demo';
import { IDemo } from '@website/templates/interface';
import { ILocalizedPageData } from './main-content';
import EditButton from '../edit-button/index';
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

  getShowDemos = (localTitle: string) => {
    const { location, demos } = this.props;
    const { expand } = this.state;
    const leftChildren = [];
    const rightChildren = [];
    const demosJump = [];
    let isSingleCol = true;

    const showedDemo = demos
      .filter(demo => demo.preview)
      .sort((a, b) => a.meta.order - b.meta.order);

    showedDemo.forEach(({ meta: { col } }) => {
      if (col && col !== 1) {
        isSingleCol = false;
      }
    });

    showedDemo.forEach((demoData, index) => {
      const { filename, title } = demoData.meta;
      const id = `scaffold-src-components-${localTitle}-demo-${
        filename
          .split('/')
          .pop()
          .split('.')[0]
        }`;

      demosJump.push({
        title: title['zh-CN'],
        id,
      });

      const demoElem = (
        <Demo
          key={filename}
          expand={expand}
          id={id}
          meta={demoData.meta}
          location={location}
        />
      );

      if (index % 2 === 0 || isSingleCol) {
        leftChildren.push(demoElem);
      } else {
        rightChildren.push(demoElem);
      }
    });

    return {
      leftChildren,
      rightChildren,
      isSingleCol,
      demosJump,
    };
  };

  render() {
    const { doc, demos } = this.props;
    const {
      meta: { title, subtitle, path },
      toc,
      descriptionHtml,
      apiHtml,
    } = doc;
    const localTitle = title['zh-CN'];

    // const { leftChildren, demosJump, rightChildren, isSingleCol } = this.getShowDemos(localTitle);

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
