import React from 'react';
import { TablePlus, FitText, SendCode, FullScreen, InfiniteScroll } from '@alitajs/antd-plus';
import { Button } from 'antd';
import { LiveProvider, LiveError, LivePreview } from 'react-live';

const scope = {
  TablePlus,
  FitText,
  SendCode,
  FullScreen,
  InfiniteScroll,
  Button
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
