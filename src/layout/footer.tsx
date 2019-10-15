import React from 'react';
import { Layout, Icon } from 'antd';
import styles from './footer.module.less';

const { Footer } = Layout;

const FooterView: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <div className={styles.copyright}>
        Copyright <Icon type="copyright" /> 2019 Alita 团队出品
      </div>

    </Footer>
  )
};

export default FooterView;
