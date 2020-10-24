import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Radio, DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { isNumber, isInteger, isObject, isNil } from 'lodash';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
import { TimeData, BaseProps } from './interface';
import { ConfigContext } from '../config-provider';
import { processQueryTimeRange, transformTimeRangeToDay, transformDayToTimeRange } from './utils';
import Fast from './fast';

export interface DaysRangeData {
  // 间隔的天数
  day: number;
  // 是否是自定义
  isCustomize: boolean;
  // 时间间隔的时间戳
  value: TimeData;
}

export interface DaysRangeProps extends BaseProps<number> {
  value?: number | TimeData;
  isMountChange?: boolean;
}

export interface DaysRangeType extends React.FC<DaysRangeProps> {
  Fast: typeof Fast;
}

const { Group, Button } = Radio;
const { RangePicker } = DatePicker;

const DaysRange: DaysRangeType = ({
  className,
  style,
  value,
  onChange,
  buttonStyle,
  size,
  type,
  formatter,
  showCustomize,
  isMountChange,
  ...rest
}) => {
  let { marks = [] } = rest;
  let isCustomize: boolean = false;
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [dayType, setDayType] = useState<number>(marks[0]);
  const [timeRange, setTimeRange] = useState<Moment[]>([]);
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('days-range');

  marks = marks
    .filter((item) => item > 0)
    .filter((item) => isInteger(item))
    .sort((a, b) => a - b);

  marks.indexOf(dayType) === -1 ? (isCustomize = true) : (isCustomize = false);

  const Item = type === 'button' ? Button : Radio;

  useEffect(() => {
    handleInit(value || marks[0]);

    // 兼容表单设置转换
    if (isNumber(value) && !isFirst) {
      setValueCallback(value);
    }
  }, [value, JSON.stringify(marks)]);

  const handleInit = (val: number | TimeData) => {
    if (isObject(val) && !isNil(val.startTime) && !isNil(val.endTime)) {
      val = transformTimeRangeToDay(val);
    }

    if (isNumber(val) && val >= 1) {
      if (marks.indexOf(val) === -1) {
        isCustomize = true;
      }

      const defaultVal = val || marks[0];

      if (isCustomize) {
        const timeRange = transformDayToTimeRange(val);

        setTimeRange(timeRange);
      }

      setDayType(defaultVal);

      if (isFirst) {
        isMountChange && setValueCallback(defaultVal);
        setIsFirst(false);
      }
    }
  };

  const handleChange = (e: RadioChangeEvent) => {
    setValueCallback(e.target.value);
  };

  const setValueCallback = useCallback(
    (nextValue) => {
      if (isNumber(nextValue)) {
        const range = transformDayToTimeRange(nextValue);

        const result = processQueryTimeRange(range);

        onChange &&
          onChange({
            startTime: result[0],
            endTime: result[1]
          });
      }

      setDayType(nextValue);
    },
    [setDayType]
  );

  const handleRangePickerChange: RangePickerProps['onChange'] = (dates) => {
    setTimeRange(dates as Moment[]);

    if (dates && dates.length === 2) {
      const result = processQueryTimeRange(dates as Moment[]);

      onChange?.({
        startTime: result[0],
        endTime: result[1]
      });
      return;
    }
    onChange?.({});
  };

  function disabledDate(current: moment.Moment) {
    // Can not select days before today and today
    return current && current >= moment().endOf('day');
  }

  return (
    <span
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Group
        size={size}
        buttonStyle={buttonStyle}
        value={isCustomize ? 'customize' : dayType}
        onChange={handleChange}
      >
        {marks.map((item) => {
          let text;
          if (formatter && formatter(item)) {
            text = formatter(item);
          }
          text = text || (item === 1 ? '今日' : `${item}天`);

          return (
            <Item key={item} value={item}>
              {text}
            </Item>
          );
        })}
        {showCustomize && (
          <Item key="customize" value="customize">
            {formatter?.('customize') ? formatter?.('customize') : '自定义'}
          </Item>
        )}
      </Group>
      {isCustomize && (
        <RangePicker
          size={size}
          value={timeRange as [Moment, Moment]}
          disabledDate={disabledDate}
          onChange={handleRangePickerChange}
        />
      )}
    </span>
  );
};

DaysRange.defaultProps = {
  type: 'button',
  marks: [7, 30],
  showCustomize: true,
  isMountChange: true
};
DaysRange.Fast = Fast;

export default DaysRange;
