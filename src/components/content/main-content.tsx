import React from 'react';
import { Menu } from 'antd';
import { Location } from 'history';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { IFrontMatterData } from '@/templates/docs';
import styles from './main-content.module.less';

export interface ILocalizedPageData {
  meta: IFrontMatterData;
  toc: string | false;
  content: string;
}

export interface IMainContentProps {
  location?: Location;
  localizedPageData?: ILocalizedPageData;
}

interface IState {
  openKeys: string[];
}

const { SubMenu } = Menu;

class MainContent extends React.PureComponent<IMainContentProps, IState> {

  render() {
    const { localizedPageData } = this.props;

    return (
      <div className={styles.mainContent}>
        123
      </div>
    )
  }
}

export default MainContent;
