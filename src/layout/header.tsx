import React from 'react';
import { Layout, Menu } from 'antd';
import { Location } from 'history';
import { Link } from 'gatsby';
import { LOGO_URL } from '@/config';
import styles from './header.module.less';

interface IProps {
  location?: Location
}

const { Header } = Layout;

const HeaderView: React.FC<IProps> = (props) => {
  const { location } = props;
  const [activeMenu, setActiveMenu] = React.useState<string>('docs');

  React.useEffect(() => {
    if (location && location.pathname) {

    }
  }, [props.location]);

  const menu = [
    <Menu
      key="nav"
      mode="horizontal"
      selectedKeys={[activeMenu]}
    >
      <Menu.Item key="home">
        <Link to="/">
          首页
        </Link>
      </Menu.Item>
      <Menu.Item key="docs">
        <Link to="/docs/getting-started">
          文档
        </Link>
      </Menu.Item>
      <Menu.Item key="components">
        <Link to="/docs/getting-started">
          组件
        </Link>
      </Menu.Item>
    </Menu>
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
        <div className={styles.menu}>
          {menu}
        </div>
      </div>
    </Header>
  )
};

export default HeaderView;
