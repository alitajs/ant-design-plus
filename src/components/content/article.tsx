import React from 'react';
import moment from 'moment';
import { Affix } from 'antd';
import EditButton from '@/components/edit-button';
import AvatarList from '@/components/avatar-list';
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

    console.log(avatarList);

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
