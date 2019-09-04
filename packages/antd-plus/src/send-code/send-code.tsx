import React from 'react';
import Button, { ButtonProps } from 'antd/es/button';
import { getTemplateText } from './utils';

export interface ISendCodeProps extends ButtonProps {
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

interface ISendCodeState {
  buttonText: string;
  start: boolean;
  loading: boolean;
}

class SendCode extends React.Component<ISendCodeProps, ISendCodeState> {
  private timer: NodeJS.Timer = null;

  private lastSecond: number = 0;

  constructor(props) {
    super(props)
  }

  static defaultProps: ISendCodeProps = {
    start: false,
    second: 60,
    initText: '获取验证码',
    runText: '{%s}秒后重新获取',
    resetText: '重新获取验证码',
  };

  readonly state: ISendCodeState = {
    buttonText: this.props.initText,
    start: false,
    loading: false
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentWillReceiveProps(nextProps: ISendCodeProps) {
    if (nextProps.start) {
      this.startCountdown();
    }
  }

  startCountdown = () => {
    const { runText } = this.props;
    let second = this.lastSecond ? this.lastSecond : this.props.second;
    this.setState({
      start: true,
    });

    if (!this.lastSecond) {
      this.setState({
        buttonText: getTemplateText(runText, second),
      });
    }
    this.timer = setInterval(() => {
      second -= 1;

      this.setState({
        buttonText: getTemplateText(runText, second),
      });

      if (second <= 0) {
        this.timeout();
      }
    }, 1000);
  };

  timeout = () => {
    const { resetText, onEnd } = this.props;
    // 设置为运行结束后文本
    this.setState({
      buttonText: resetText,
      start: false,
    });
    if (this.timer) {
      clearInterval(this.timer);
    }
    // 发出倒计时结束事件
    onEnd && onEnd();
  };

  render() {
    const { start, second, initText, resetText, runText, onEnd, ...rest } = this.props;
    const { loading, buttonText } = this.state;

    return (
      <Button
        loading={loading}
        disabled={this.state.start}
        {...rest}
      >
        {buttonText}
      </Button>
    );
  }
}

export default SendCode;
