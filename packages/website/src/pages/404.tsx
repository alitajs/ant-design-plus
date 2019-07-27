import React from 'react'
import Seo from '../components/seo';
import styles from './404.module.less';

const NotFoundPage = () => (
  <div className={styles.exception}>
    <Seo title="404" />
    <div className={styles.imgBlock}>
      <div className={styles.imgEle} />
    </div>
    <div className={styles.content}>
      <h1>404</h1>
      <div className={styles.desc}>
        Sorry, the page you visited does not exist
      </div>
      <div className="actions">
        <a href="/">
          <span>Back to home</span>
        </a>
      </div>
    </div>
  </div>
);

export default NotFoundPage
