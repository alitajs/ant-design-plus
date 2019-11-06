import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Location } from 'history';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'gatsby';
import { LOGO_URL } from '@site/config';
import * as utils from '../utils';
import styles from './header.module.less';

interface IProps {
  location?: Location;
}

const { Header } = Layout;

const HeaderView: React.FC<IProps> = props => {
  const { location } = props;
  const [activeMenu, setActiveMenu] = React.useState<string>('docs');

  React.useEffect(() => {
    if (location && location.pathname) {
      const path = location.pathname;
      const module = location.pathname
        .replace(/(^\/|\/$)/g, '')
        .split('/')
        .slice(0, -1)
        .join('/');

      let activeMenuItem = module || 'home';
      if (/^components/.test(path)) {
        activeMenuItem = 'components';
      } else if (/docs/.test(path)) {
        activeMenuItem = 'docs';
      } else if (path === '/') {
        activeMenuItem = 'home';
      }
      setActiveMenu(activeMenuItem);
    }
  }, [props.location]);

  const handleLangChange = () => {
    const { pathname } = location;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
      );
  };

  const localeLink = str => {
    return str + (utils.isZhCN(location.pathname) ? '-cn' : '');
  };

  const menu = [
    <Menu key="nav" mode="horizontal" selectedKeys={[activeMenu]}>
      <Menu.Item key="home">
        <Link to="/">
          <FormattedMessage id="app.header.home" />
        </Link>
      </Menu.Item>
      <Menu.Item key="docs">
        <Link to={localeLink('/docs/getting-started')}>
          <FormattedMessage id="app.header.docs" />
        </Link>
      </Menu.Item>
      <Menu.Item key="components">
        <Link to={localeLink('/components/send-code')}>
          <FormattedMessage id="app.header.components" />
        </Link>
      </Menu.Item>
    </Menu>,
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={LOGO_URL} alt="logo" />
          <span>Ant Design Plus</span>
        </Link>
      </div>

      <div className={styles.headerMeta}>
        <Button size="small" onClick={handleLangChange} className={styles.headerLangButton}>
          <FormattedMessage id="app.header.lang" />
        </Button>
        <div className={styles.menu}>{menu}</div>
      </div>
    </Header>
  );
};

export default injectIntl(HeaderView);
