import React from 'react';
import moment from 'moment';
import { Menu, Row, Col, Icon, Badge } from 'antd';
import { Location } from 'history';
import { Link } from 'gatsby';
import SEO from '../seo';
import { IFrontMatterData, IDemo } from '@site/templates/interface';
import { IMenuDataItem, IMenuData }  from './interface';
import Article from './article';
import ComponentDoc from './component-doc';
import { getModuleDataWithProps, getMenuItems } from './utils';
import styles from './main-content.module.less';

export interface ILocalizedPageData {
  meta: IFrontMatterData;
  toc: string | false;
  content: string;
  descriptionHtml?: string;
  apiHtml?: string;
}

export interface IMainContentProps {
  location?: Location;
  menus?: IMenuDataItem[];
  demos?: IDemo[];
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
  private currentModule = null;
  constructor(props: IMainContentProps) {
    super(props);
    this.state = {
      openKeys: this.getSideBarOpenKeys(props) || []
    };
  }

  componentWillReceiveProps(nextProps) {
    const openKeys = this.getSideBarOpenKeys(nextProps);
    if (openKeys) {
      this.setState({
        openKeys
      });
    }
  }

  handleMenuOpenChange = openKeys => {
    this.setState({
      openKeys,
    });
  };

  /**
   * 生成子菜单项
   * @param data
   * @param footerNavIcons
   */
  generateSubMenuItems = (
    data: IMenuData,
    footerNavIcons = {}
  ) => {
    if (!data) return [];
    return Object.keys(data)
      .map(type => {
        const groupItems = (data[type] as IMenuDataItem[])
          .sort((a, b) => {
            if ('time' in a && 'time' in b) {
              return moment(b.time).valueOf() - moment(a.time).valueOf();
            }
            if ('order' in a && 'order' in b) {
              return a.order - b.order;
            }
            return a.title['zh-CN'].charCodeAt(0) - b.title['zh-CN'].charCodeAt(0);
          })
          .map(this.generateMenuItem.bind(this, footerNavIcons));

        return (
          <SubMenu title={type} key={type}>
            {groupItems}
          </SubMenu>
        );
      });
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
    const title = item.title['zh-CN'];
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
      <Menu.Item key={item.filename} disabled={disabled}>
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

    const menus = this.generateSubMenuItems(menuItems as IMenuData, footerNavIcons) || [];

    return menus.filter(({ key }) => key);
  };

  getSideBarOpenKeys = (nextProps: IMainContentProps) => {
    const {
      location: { pathname }
    } = nextProps;
    const prevModule = this.currentModule;
    this.currentModule = pathname.replace(/^\//, '').split('/')[1] || 'components';

    if (prevModule !== this.currentModule) {
      const moduleData = getModuleDataWithProps(nextProps);

      return Object.keys(getMenuItems(moduleData));
    }

    return []
  };

  getActiveMenuItem = () => {
    const { location } = this.props;

    return location.pathname;
  };

  render() {
    const { localizedPageData, demos } = this.props;
    const title = localizedPageData.meta.title['zh-CN'];
    const { openKeys } = this.state;
    const menuItems = this.getMenuItems();
    const activeMenuItem = this.getActiveMenuItem();

    return (
      <div className={styles.mainContent}>
        <SEO title={title} />
        <Row>
          <Col
            {...menuColProps}
            className={styles.mainMenu}
          >
            <Menu
              inlineIndent={16}
              className={styles.asideContainer}
              mode="inline"
              openKeys={openKeys}
              selectedKeys={[activeMenuItem]}
              onOpenChange={this.handleMenuOpenChange}
            >
              {menuItems}
            </Menu>
          </Col>
          <Col
            {...containerColProps}
            className={styles.mainContainer}
          >
            {demos ? (
              <ComponentDoc
                {...this.props}
                doc={localizedPageData}
                demos={demos}
              />
            ) : (
              <Article content={localizedPageData} />
            )}

          </Col>
        </Row>
      </div>
    )
  }
}

export default MainContent;
