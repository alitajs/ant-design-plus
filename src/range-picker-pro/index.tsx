import React, { useState, useEffect, useCallback, useRef } from 'react';
import moment from 'moment';
import { DatePicker, Radio, Space } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { RadioChangeEvent, RadioGroupProps } from 'antd/es/radio';
import { startOf, endOf, disabledAfterTodayDate, getRangePickerProps } from './utils';
import { isArray } from 'lodash';

const { RangePicker } = DatePicker;

export type PeriodType =
  'year' |
  'month' |
  'day' |
  'hour' |
  'minute' |
  'second';

export type RangeValue<T = number> = [T, T] | null;

export type ValueType<T = number> =
{
  period: PeriodType;
  rangeTime: RangeValue<T>;
} | RangeValue<T>

export interface PeriodData {
  /**
   * 间隔类型
   */
  periodType?: PeriodType;
  /**
   * 间隔值
   */
  periodValue?: number;
}

export interface OptionValue {
  /**
   * 粒度类型
   */
  value: PeriodType;
  /**
   * 粒度描述
   */
  label: string;
  /**
   * 粒度的数值
   */
  periodValue: number;
}

interface OtherProps {
  /**
   * 是否禁用选择
   * 设置为false则value类型为: [number, number];
   * 设置为true则value类型为 {
   *   period: PeriodType;
   *   rangeTime: [number, number]
   * }
   * @default true
   */
  disabledSelect?: boolean;
  /**
   * 默认的时间
   * 请注意设置则会在组件初始化时，触发onChange
   */
  defaultTimes?: RangePickerProps['value'];
  /**
   * 切换区域与选择时间区域的间隔
   */
  spaceSize?: number;
  /**
   * 是否禁用今天之后的日期
   * @default true
   */
  disabledAfterToday?: boolean;
  /**
   * 粒度改变时是否清空时间
   * @default true
   */
  periodChangeClearDate?: boolean;
  /**
   * 时间框非空才可触发onChange
   * @default true
   */
  dateNotNullChange?: boolean;
  /**
   * 选择项配置
   */
  options: OptionValue[];
  optionType?: RadioGroupProps['optionType']
  value?: ValueType;
  onChange?: (value: ValueType) => void;
}

export type RangePickerProProps = Omit<RangePickerProps, 'value' | 'onChange'> & OtherProps;

const RangePickerPro: React.FC<RangePickerProProps> = ({
  defaultTimes,
  disabledSelect,
  dateNotNullChange = true,
  disabledAfterToday = true,
  periodChangeClearDate = true,
  options = [],
  spaceSize,
  optionType,
  value,
  onChange,
  ...rest
}) => {
  // 筛选粒度
  const [period, setPeriod] = useState<PeriodType>(options[0]?.value);
  const latestCurrentOption = useRef<OptionValue>(options[0]);
  // 时间戳类型的时间范围
  const [rangeTime, setRangeTime] = useState<RangeValue>();
  // moment类型的时间范围
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerProps['value']>();
  const [rangePickerOpts, setRangePickerOpts] = useState<RangePickerProps>({});

  const { value: periodType, periodValue } = latestCurrentOption.current;

  useEffect(() => {
    if (defaultTimes && defaultTimes.length == 2) {
      const times = handleRangeTime(defaultTimes, periodType);
      if (disabledSelect) {
        onChange?.({
          period: periodType,
          rangeTime: times
        });
      } else {
        onChange?.(times);
      }
      return;
    }
    if (periodType && periodValue) {
      if (periodChangeClearDate) {
        handleRangeTime(null);
        triggerChange({ period: periodType, rangeTime: null });
      } else {
        const times = handleRangeTime(rangeTime, periodType);
        triggerChange({ period: periodType, rangeTime: times });
      }

      setRangePickerOpts(getRangePickerProps({ periodType, periodValue }));
    }
  }, []);

  const handleRangeTime = (
    value: RangeValue | RangePickerProps['value'],
    periodTypeVal?: PeriodType
  ) => {
    if (isArray(value) && value.length === 2 && periodTypeVal) {
      const times: RangeValue = [
        startOf(value[0], periodTypeVal),
        endOf(value[1], periodTypeVal)
      ];
      setRangeTime(times);
      setRangePickerValue(times.map((item) => moment(item)) as RangePickerProps['value']);
      return times;
    } else {
      setRangeTime(null);
      setRangePickerValue(null);
      return null;
    }
  }

  /**
   * 筛选粒度修改回调
   * @param e
   */
  const handlePeriodChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    latestCurrentOption.current = options.find(item => item.value === value);

    setPeriod(value);

    setRangePickerOpts(
      getRangePickerProps({
        periodType: value,
        periodValue
      })
    );

    if (periodChangeClearDate) {
      handleRangeTime(null);
      triggerChange({ period: value, rangeTime: null });
    } else {
      const times = handleRangeTime(rangeTime, value);
      triggerChange({ period: value, rangeTime: times });
    }
  };

  const handleRangePickerChange: RangePickerProps['onChange'] = (values) => {
    const times = handleRangeTime(values, period);
    triggerChange({ rangeTime: times });
  };

  const triggerChange = (changedValue: { rangeTime?: RangeValue; period?: PeriodType }) => {
    const nextValue = {
      period,
      rangeTime,
      ...changedValue
    };
    if (dateNotNullChange) {
      if (nextValue.period && nextValue.rangeTime && nextValue.rangeTime.length === 2) {
        handleChange(nextValue);
      }
      return;
    }
    handleChange(nextValue);
  };

  const handleChange = useCallback(
    (value: { rangeTime?: RangeValue; period?: PeriodType }) => {
      if (disabledSelect) {
        onChange?.(value.rangeTime)
      } else {
        onChange?.(value as ValueType)
      }
    },
    [disabledSelect]
  )

  const rangePickerOptions = {
    disabledDate: disabledAfterToday ? disabledAfterTodayDate : undefined,
    ...rest,
    value: rangePickerValue,
    onChange: handleRangePickerChange,
    ...rangePickerOpts
  } as RangePickerProps;

  if (disabledSelect) {
    return (<RangePicker {...rangePickerOptions} />);
  }

  return (
    <Space direction="horizontal" size={spaceSize}>
      <Radio.Group
        value={period}
        optionType={optionType}
        options={options}
        onChange={handlePeriodChange}
      />
      <RangePicker {...rangePickerOptions} />
    </Space>
  );
};

RangePickerPro.defaultProps = {
  spaceSize: 8,
  optionType: 'button',
  disabledSelect: false
}

export default RangePickerPro;
