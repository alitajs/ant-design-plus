import React from 'react';
import moment from 'moment';
import { Affix } from 'antd';
import EditButton from '../edit-button/index';
import AvatarList from '../avatar-list/index';
import { ILocalizedPageData } from './main-content';
import styles from './article.module.less';

export interface IArticleProps {
  content: ILocalizedPageData;
}

class Article extends React.PureComponent<IArticleProps> {
  private root: HTMLElement;

  render() {
    const { content } = this.props;
    const { meta } = content;
    const { title, subtitle, path, modifiedTime, avatarList = [] } = meta;

    return (
      <article
        className="markdown"
        ref={node => {
          this.root = node;
        }}
      >
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

        <div className={styles.modifiedTime}>
          <AvatarList list={avatarList} />
          上次修改时间: {moment(modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
        </div>

        {!content.toc || content.toc.length <= 1 || meta.toc === false ? null : (
          <Affix className="toc-affix" offsetTop={16}>
            <div
              dangerouslySetInnerHTML={{
                __html: content.toc.replace(/<ul>/g, '<ul class="toc">').replace(/\/#/g, '#'),
              }}
            />
          </Affix>
        )}

        <section
          className="markdown api-container"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />

      </article>
    )
  }
}


export default Article;
