import React from 'react';
import { FitText, SendCode, FullScreen, ButtonList, ErrorBoundary } from '@alitajs/antd-plus';
import { Button, Menu, Dropdown, Icon } from 'antd';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import { ErrorComponent, Fallback } from '../error-components';

const scope = {
  ErrorBoundary,
  ButtonList,
  FitText,
  SendCode,
  FullScreen,
  ErrorComponent,
  Fallback,
  // ant-design
  Button,
  Menu,
  Dropdown,
  Icon,
};

interface PlaygroundProps {
  code?: string;
}

const Playground: React.FC<PlaygroundProps> = (props) => {
  const { code } = props;
  return (
    <section>
      <LiveProvider
        code={code}
        scope={scope}
      >
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </section>
  )
};

export default Playground
