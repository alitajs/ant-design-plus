/**
 * @author wangxingkang
 * @date 2019-07-15 11:54
 * @description 验证码组件
 *
 * @last-modified-by wangxingkang
 * @last-modified-time 2019-07-15 11:54
 */
import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { isPromise } from '@alitajs/autils';
import { getTemplateText } from './utils';

export interface ISendCodeProps extends ButtonProps {
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
  // 获取验证码执行函数
  // 会根据返回结果决定是否执行倒计时
  onCaptcha?: () => boolean | Promise<any>;
}

interface ISendCodeState {
  buttonText: string;
  start: boolean;
  loading: boolean;
}

class SendCode extends React.Component<ISendCodeProps, ISendCodeState> {
  private timer: NodeJS.Timer = null;

  private lastSecond: number = 0;

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
    loading: false,
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentWillReceiveProps(nextProps: ISendCodeProps) {
    if (nextProps.start) {

    }
    console.log(nextProps);
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
    if (onEnd) {
      onEnd();
    }
  };

  handleClick = e => {
    e.preventDefault();
    const { onCaptcha } = this.props;

    this.setState({
      loading: true,
    });

    const result = onCaptcha ? onCaptcha() : null;

    if (isPromise(result)) {
      result
        // @ts-ignore
        .then(() => {
          this.setState({
            loading: false,
          });
          this.startCountdown();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
      return;
    }

    if (result) {
      this.setState({
        loading: false,
      });
      this.startCountdown();
    }
  };

  render() {
    const { start, second, initText, resetText, runText, onCaptcha, onEnd, ...rest } = this.props;
    const { loading, buttonText } = this.state;

    return (
      <Button
        onClick={this.handleClick}
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
