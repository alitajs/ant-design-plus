import React, { Component } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { getTemplateText } from './utils';
import enUS from './locale/en_US';
import LocaleReceive from 'antd/es/locale-provider/LocaleReceiver';

export interface SendCodeProps extends ButtonProps {
  // 是否开始倒计时
  start?: boolean;
  // 倒计时时长（秒）默认60
  second?: number;
  // 初始化按钮显示文本
  initText?: string;
  // 运行时显示文本
  // 自己设置必须包含{%s}
  runText?: string;
  // 运行结束后显示文本
  resetText?: string;
  // 倒计时结束执行函数
  onEnd?: () => void;
}

interface SendCodeState {
  loading: boolean;
  // 运行状态 0: 初始 1: 运行时  2: 结速时
  status: number;
  second: number | undefined;
}

export interface SendCodeLocale {
  initText: string;
  runText: string;
  resetText: string;
}

class SendCode extends Component<SendCodeProps, SendCodeState> {
  private timer: NodeJS.Timer = null;

  constructor(props) {
    super(props);
  }

  static defaultProps: SendCodeProps = {
    start: false,
    second: 60
  };

  readonly state: SendCodeState = {
    loading: false,
    status: this.props.start ? 1 : 0,
    second: undefined
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentWillReceiveProps(nextProps: SendCodeProps) {
    if (nextProps.start) {
      this.startCountdown();
    }
  }

  startCountdown = () => {
    let second = this.state.second || this.props.second;
    this.setState({ second, status: 1 });

    this.timer = setInterval(() => {
      second -= 1;

      this.setState({ second });

      if (second <= 0) {
        this.timeout();
      }
    }, 1000);
  };

  timeout = () => {
    const { onEnd } = this.props;
    // 设置为运行结束后状态
    this.setState({
      second: undefined,
      status: 2
    });
    if (this.timer) {
      clearInterval(this.timer);
    }
    // 发出倒计时结束事件
    onEnd && onEnd();
  };

  buttonText = (sendCodeLocale: SendCodeLocale) => {
    const { initText, resetText, runText } = this.props;
    const { status, second } = this.state;
    switch (status) {
      case 1:
        return getTemplateText(runText || sendCodeLocale.runText, second);
      case 2:
        return resetText || sendCodeLocale.resetText;
      default:
        return initText || sendCodeLocale.initText;
    }
  };

  renderSendCode = (sendCodeLocale: SendCodeLocale) => {
    const { start, initText, resetText, runText, onEnd, ...rest } = this.props;
    const { loading, status } = this.state;

    return (
      <Button loading={loading} disabled={status === 1} {...rest}>
        {this.buttonText(sendCodeLocale)}
      </Button>
    );
  };

  render() {
    return (
      <LocaleReceive componentName="SendCode" defaultLocale={enUS}>
        {(sendCodeLocale: SendCodeLocale) => this.renderSendCode(sendCodeLocale)}
      </LocaleReceive>
    );
  }
}

export default SendCode;
