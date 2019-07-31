import React from 'react';
import { Tooltip, Icon } from 'antd';
import { SOURCE_PATH } from '@site/config';

interface IProps {
  title: React.ReactNode;
  filename?: string;
  sourcePath?: string;
}

const EditButton: React.FC<IProps> = (props) => {
  const { title, sourcePath, filename } = props;
  return (
    <Tooltip title={title}>
      <a
        className="edit-button"
        target="_blank"
        rel="noopener noreferrer"
        href={`${sourcePath}${filename}`}
      >
        <Icon type="edit" />
      </a>
    </Tooltip>
  )
};

EditButton.defaultProps = {
  sourcePath: SOURCE_PATH
};

export default EditButton;
