import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Location } from 'history';
import { IntlProvider } from 'react-intl';
import Header from './header';
import Footer from './footer';
import zhCN from '../../components/locale/zh_CN';
import enLocale from '../en-US';
import cnLocale from '../zh-CN';
import * as utils from '../utils';

const { Content } = Layout;

interface IProps {
  location?: Location;
}

const BasicLayout: React.FC<IProps> = props => {
  const { children, location } = props;
  const { pathname } = location;
  const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
  // const appLocale = localStorage.getItem('locale') === 'zh-CN' ? cnLocale : enLocale;

  console.log('cn', cnLocale)
  console.log('en', enLocale)
  console.log(';s', appLocale)
  return (
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages} defaultLocale="en-US">
      <ConfigProvider locale={appLocale.locale === 'zh-CN' ? zhCN : null}>
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
    </IntlProvider>
  );
};

export default BasicLayout;
