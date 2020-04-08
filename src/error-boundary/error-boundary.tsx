import React, { ErrorInfo } from 'react';

const initialState = {
  error: null,
  info: null
};

export interface ErrorBoundaryProps {
  onError?: (error: Error, componentStack: string) => void;
  Fallback: React.ComponentType<{ error: Error; componentStack: string }>;
}
type ErrorBoundaryState = typeof initialState;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = initialState;

  public componentDidCatch(error: Error, info: ErrorInfo) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, getComponentStack(info));
    }
    this.setState({
      error,
      info
    });
  }

  render() {
    const { Fallback } = this.props;
    const { error, info } = this.state;
    if (error) {
      return <Fallback componentStack={getComponentStack(info)} error={error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

function getComponentStack(info: ErrorInfo) {
  return info ? info.componentStack : '';
}
