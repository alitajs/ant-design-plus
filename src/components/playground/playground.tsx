import React from 'react';
import { Button } from 'antd';
import { LiveProvider, LiveError, LivePreview } from 'react-live';

const components = require('../../../index');

const scope = {
  ...components,
  // ant-design
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
        noInline
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
