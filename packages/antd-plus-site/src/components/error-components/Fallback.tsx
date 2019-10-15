import React from 'react';

interface FallbackProps {
  error: Error;
  componentStack: string;
}
const Fallback: React.FC<FallbackProps> = ({ error, componentStack }) => (
  <div>
    <div>对不起，程序出错了</div>
    <div>{componentStack}</div>
  </div>
);
export default Fallback;
