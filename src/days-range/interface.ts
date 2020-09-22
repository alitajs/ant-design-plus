import { RadioGroupProps } from 'antd/lib/radio/interface';

export interface TimeData {
  startTime?: number;
  endTime?: number;
}

export interface BaseProps<T> {
  /**
   * 额外的样式类
   */
  className?: string;
  /**
   * 额外的样式
   */
  style?: React.CSSProperties;
  /**
   * 按钮样式的样式设置
   */
  buttonStyle?: RadioGroupProps['buttonStyle'];
  /**
   * 渲染类型
   */
  type?: 'radio' | 'button';
  /**
   * 显示的操作项
   */
  marks?: T[];
  /**
   * 是否支持自定义
   */
  showCustomize?: boolean;
  /**
   * 对文本进行自定义设置
   */
  formatter?: (day: T | 'customize') => string | React.ReactNode;
  /**
   * 大小设置
   */
  size?: RadioGroupProps['size'];
  /**
   * 时间段变化的回调
   */
  onChange?: (data: TimeData) => void;
}
