import React from 'react';
import { Avatar, Tooltip } from 'antd';
import styles from './avatar-list.module.less';

export interface IAvatar {
  href: string;
  text: string;
  src: string;
}

interface IProps {
  list: IAvatar[];
}

const AvatarList: React.FC<IProps> = (props) => {
  const { list = [] } = props;

  return (
    <div className={styles.avatarList}>
      {list.map((item, index) => (
        <a
          className={styles.hrefBox}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          href={`http://github.com${item.href}`}
        >
          <Tooltip title={item.text}>
            <Avatar src={item.src} alt={item.text} size="small" />
          </Tooltip>
        </a>
      ))}
    </div>
  )
};

export default AvatarList;
