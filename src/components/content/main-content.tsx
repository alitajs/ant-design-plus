import React from 'react';
import { Menu, Row, Col } from 'antd';
import { Location } from 'history';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { IFrontMatterData, IMenuDataItem } from '@/templates/docs';
import Article from './article';
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

  getMenuItems = (footerNavIcons = {}) => {
    const moduleData = this.getModuleDataWithProps(this.props);

  };

  getModuleDataWithProps = (props: IMainContentProps) => {
    const moduleData = props.menus;

    return moduleData.filter(({ filename }) => {
      if (!filename) {
        return false;
      }
      return filename;
    })
  };

  render() {
    const { localizedPageData } = this.props;
    const { openKeys } = this.state;
    const { meta, content } = localizedPageData;
    const { title, subtitle, path, modifiedTime } = meta;

    const menuChild = (
      <Menu
        inlineIndent={16}
        className={styles.asideContainer}
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[]}
      >

      </Menu>
    );

    console.log(this.props.localizedPageData);

    return (
      <div className={styles.mainContent}>
        <Row>
          <Col {...menuColProps} className={styles.mainMenu}>
            123
          </Col>
          <Col {...containerColProps} className={styles.mainContainer}>
            <Article content={localizedPageData} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default MainContent;
