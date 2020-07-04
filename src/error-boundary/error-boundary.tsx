import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(nextProps: any, state: any) {
    if (state.children !== nextProps.children) {
      return {
        children: nextProps.children,
        hasError: false,
        error: undefined
      };
    }
    return null;
  }

  state: ErrorBoundaryState = {
    hasError: false
  };

  renderError = (e: Error) => {
    switch (e) {
      default:
        // fallback
        return <h5>组件出错了，请核查后重试： {e.message}</h5>;
    }
  };

  render() {
    if (this.state.hasError) {
      return this.renderError(this.state.error!);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
