import React from 'react';
import moment from 'moment';
import { Menu, Row, Col, Icon, Badge } from 'antd';
import { Location } from 'history';
import { Link } from 'gatsby';
import { IFrontMatterData } from '@/templates/interface';
import { IMenuDataItem, IMenuData }  from './interface';
import Article from './article';
import { getModuleDataWithProps, getMenuItems } from './utils';
import styles from './main-content.module.less';

export interface ILocalizedPageData {
  meta: IFrontMatterData;
  toc: string | false;
  content: string;
}

export interface IMainContentProps {
  location?: Location;
  menus?: IMenuDataItem[];
  localizedPageData?: ILocalizedPageData;
}

interface IState {
  openKeys: string[];
}

const { SubMenu } = Menu;
const menuColProps = {
  xxl: 4,
  xl: 5,
  lg: 6,
  md: 24,
  sm: 24,
  xs: 24
};
const containerColProps = {
  xxl: 20,
  xl: 19,
  lg: 18,
  md: 24,
  sm: 24,
  xs: 24
};

class MainContent extends React.PureComponent<IMainContentProps, IState> {
  constructor(props: IMainContentProps) {
    super(props);
    this.state = {
      openKeys: [],
    };
  }

  /**
   * 生成子菜单项
   * @param data
   * @param footerNavIcons
   */
  generateSubMenuItems = (
    data: IMenuData,
    footerNavIcons = {}
  ) => {
    const itemGroups = Object.keys(data)
      .map(type => {
        const groupItems = (data[type] as IMenuDataItem[])
          .sort((a, b) => {
            if ('time' in a && 'time' in b) {
              return moment(b.time).valueOf() - moment(a.time).valueOf();
            }
            if ('order' in a && 'order' in b) {
              return a.order - b.order;
            }
            return a.title['zh_CN'].charCodeAt(0) - b.title['zh_CN'].charCodeAt(0);
          })
          .map(this.generateMenuItem.bind(this, footerNavIcons));

        return (
          <SubMenu title={type} key={type}>
            {groupItems}
          </SubMenu>
        );
      });
    return [...itemGroups] || [];
  };

  /**
   * 生成菜单项
   */
  generateMenuItem = (
    { before = null, after = null },
    item: IMenuDataItem
  ) => {
    if (!item.title) return null;
    const { disabled } = item;
    const title = item.title['zh_CN'];
    const child = !item.link ? (
      <Link to={item.filename}>
        {before}
        {title}
        {after}
      </Link>
    ) : (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item-link-outside"
      >
        {before}
        {title} <Icon type="export" />
        {after}
      </a>
    );

    return (
      <Menu.Item key={item.filename}>
        {item.important
          ? <Badge dot={item.important}>{child}</Badge>
          : child
        }
      </Menu.Item>
    );
  };

  getMenuItems = (footerNavIcons = {}) => {
    const moduleData = getModuleDataWithProps(this.props);

    const menuItems = getMenuItems(moduleData) || {};

    console.log(menuItems);

    const menus =
      this.generateSubMenuItems(menuItems as IMenuData, footerNavIcons) || [];

    return menus.filter(({ key }) => key);
  };

  render() {
    const { localizedPageData } = this.props;
    const { openKeys } = this.state;
    const menuItems = this.getMenuItems();

    console.log(this.props.menus);

    const menus = (
      <Menu
        inlineIndent={16}
        className={styles.asideContainer}
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[]}
      >
        {menuItems}
      </Menu>
    );

    return (
      <div className={styles.mainContent}>
        <Row>
          <Col
            {...menuColProps}
            className={styles.mainMenu}
          >
            {menus}
          </Col>
          <Col
            {...containerColProps}
            className={styles.mainContainer}
          >
            <Article content={localizedPageData} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default MainContent;
