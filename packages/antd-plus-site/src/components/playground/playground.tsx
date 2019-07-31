import * as React from 'react';
import { SendCode } from '@alitajs/antd-plus';
import { LiveProvider, LiveError, LivePreview } from 'react-live';

const scope = { SendCode };

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
