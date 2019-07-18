import React from 'react';
import { Button } from 'antd';
import { Link } from 'gatsby';
import GitHubButton from 'react-github-button';
import styles from './home.module.less';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.homeWrapper}>
        <div key="line" className={styles.titleLineWrapper}>
          <div className={styles.titleLine} style={{ transform: 'translateX(-64px)' }} />
        </div>
        <h1 key="h1">ANT DESIGN PlUS</h1>
        <p>提炼于真实场景的业务组件</p>
        <div className={styles.buttonWrapper}>
          <Link to="/docs/getting-started">
            <Button type="primary">
              文档
            </Button>
          </Link>
          <Button style={{ margin: '0 16px' }} type="primary" ghost>
            组件
          </Button>
          <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="alitajs"
            repo="ant-design-plus"
          />
        </div>
      </div>
    </div>
  )
};

export default Home;
