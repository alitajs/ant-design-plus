import React, { Component, ComponentType, ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
  fallback: ComponentType<{ error: ErrorInfo; componentStack: string }>;
  onError?: (error: Error, componentStack: string) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: ErrorInfo;
}

function getComponentStack(info: ErrorInfo) {
  return info ? info.componentStack : '';
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: ErrorInfo) {
    return {
      hasError: true,
      error
    };
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

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, getComponentStack(info));
    }
  }

  renderError = (e: ErrorInfo) => {
    const { fallback: Fallback } = this.props;

    if (Fallback) {
      return (
        <Fallback componentStack={getComponentStack(this.state.error)} error={this.state.error} />
      );
    }

    switch (e) {
      default:
        // fallback
        return <h5>组件出错了，请核查后重试： {e.componentStack}</h5>;
    }
  };

  render() {
    if (this.state.hasError) {
      return this.renderError(this.state.error);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
