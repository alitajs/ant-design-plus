import React from 'react';
import { Layout } from 'antd';
import styles from './footer.module.less';

const { Footer } = Layout;

const FooterView: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      footer
    </Footer>
  )
};

export default FooterView;
