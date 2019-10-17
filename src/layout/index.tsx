import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import Header from './header';
import Footer from './footer';
import zhCN from '../../components/locale/zh_CN';

const { Content } = Layout;

const BasicLayout: React.FC = props => {
  const { children } = props;
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header {...props} />
        <Content
          style={{
            background: '#fff',
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
