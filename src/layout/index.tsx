import React from 'react';
import { Layout } from 'antd';
import Header from './header';
import Footer from './footer';

const { Content } = Layout;

const BasicLayout: React.FC = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Header {...props} />
      <Content
        style={{
          background: '#fff'
        }}
      >
        {children}
      </Content>
      <Footer />
    </Layout>
  )
};

export default BasicLayout;
