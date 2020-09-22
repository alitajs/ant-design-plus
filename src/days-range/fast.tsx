import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Radio, DatePicker } from 'antd';
import { isObject } from 'lodash';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import classNames from 'classnames';
import { TimeData, BaseProps } from './interface';
import { ConfigContext } from '../config-provider';
import { processQueryTimeRange } from './utils';

export type Mark = 'day' | 'week' | 'month' | 'year';
export type MarkTexts = Record<Mark, string>;
interface FastProps extends BaseProps<Mark> {
  value?: TimeData;
}

const { Group, Button } = Radio;
const { RangePicker } = DatePicker;
const texts: MarkTexts = {
  day: '今日',
  week: '本周',
  month: '本月',
  year: '本年'
};

const Fast: React.FC<FastProps> = ({
  className,
  style,
  value,
  onChange,
  buttonStyle,
  size,
  type,
  formatter,
  showCustomize,
  marks = []
}) => {
  const [currentUnit, setCurrentUnit] = useState<Mark>();
  const [timeRange, setTimeRange] = useState<RangePickerProps['value']>();
  const { getPrefixCls } = useContext(ConfigContext);

  useEffect(() => {
    if (isObject(value) && value.startTime && value.endTime) {
      const range = [moment(value.startTime), moment(value.endTime)];
      setTimeRange(range as RangePickerProps['value']);
    }
  }, [value]);

  useEffect(() => {
    setCurrentUnit(getUnitByTimeRange(timeRange));
  }, [timeRange]);

  const prefixCls = getPrefixCls('days-range');
  const Item = type === 'button' ? Button : Radio;

  const handleChange = (e: RadioChangeEvent) => {
    setValueCallback(e.target.value);
  };

  const getTimeRange = (unit: Mark = 'day') => {
    const startTime = moment().startOf(unit);
    return [startTime, moment()];
  };

  const getUnitByTimeRange = (range: RangePickerProps['value']) => {
    if (
      range &&
      range.length === 2 &&
      moment.isMoment(range[0]) &&
      moment.isMoment(range[1]) &&
      formatTime(range[1]) === formatTime(moment())
    ) {
      if (formatTime(moment().startOf('day')) === formatTime(range[0])) {
        return 'day';
      }

      if (formatTime(moment().startOf('week')) === formatTime(range[0])) {
        return 'week';
      }

      if (formatTime(moment().startOf('month')) === formatTime(range[0])) {
        return 'month';
      }

      if (formatTime(moment().startOf('year')) === formatTime(range[0])) {
        return 'year';
      }
    }

    return undefined;
  };

  const formatTime = (time: moment.Moment) => {
    return time.format('YYYY-MM-DD');
  };

  const setValueCallback = useCallback(
    (nextValue) => {
      const range = getTimeRange(nextValue);
      const result = processQueryTimeRange(range);

      onChange &&
        onChange({
          startTime: result[0],
          endTime: result[1]
        });

      setTimeRange(range as RangePickerProps['value']);
      setCurrentUnit(nextValue);
    },
    [setCurrentUnit]
  );

  const handleRangePickerChange = (dates: moment.Moment[]) => {
    setTimeRange(dates as RangePickerProps['value']);
    if (dates && dates.length === 2) {
      const result = processQueryTimeRange(dates);

      onChange &&
        onChange({
          startTime: result[0],
          endTime: result[1]
        });
      return;
    }

    onChange && onChange({});
  };

  function disabledDate(current) {
    return current && current >= moment().endOf('day');
  }

  return (
    <span
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Group size={size} buttonStyle={buttonStyle} value={currentUnit} onChange={handleChange}>
        {marks.map((item) => {
          let text;
          if (formatter && formatter(item)) {
            text = formatter(item);
          }
          return (
            <Item key={item} value={item}>
              {text || texts[item]}
            </Item>
          );
        })}
      </Group>
      {showCustomize && (
        <RangePicker
          size={size}
          value={timeRange}
          disabledDate={disabledDate}
          onChange={handleRangePickerChange}
        />
      )}
    </span>
  );
};

Fast.defaultProps = {
  type: 'button',
  marks: ['day', 'week', 'month'],
  showCustomize: true
};

export default Fast;
