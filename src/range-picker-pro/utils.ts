import moment, { MomentInput } from 'moment';
import { RangePickerProps } from 'antd/es/date-picker';
import { PeriodData } from './';

/**
 * 获取禁用的时间
 * @param start
 * @param end
 */
export function disabledRangeTime(start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Ant Design 日期选择组件，禁用今天之后的时间
 * @param current
 */
export const disabledAfterTodayDate: RangePickerProps['disabledDate'] = (current) => {
  return moment().endOf('day') < moment(current).endOf('day');
};

/**
 * 获取指定天的开始时间的时间戳
 * @param time
 * @example 2020-01-01 >> 2020-01-01 00:00:00 >> 时间戳
 */
export function startOf(time: MomentInput, type: moment.unitOfTime.StartOf = 'day') {
  return moment(time).startOf(type).valueOf();
}

/**
 * 获取指定天的结束时间的时间戳
 * @param time
 * @example 2020-01-01 >> 2020-01-01 23:59:59 >> 时间戳
 */
export function endOf(time: MomentInput, type: moment.unitOfTime.StartOf = 'day') {
  return moment(time).endOf(type).valueOf();
}

const getDisabledMinutes = (value: number) => {
  const minutes: number[] = [];

  for (let i = 0; i < 60; i++) {
    if (i % value !== 0) {
      minutes.push(i);
    }
  }

  return minutes;
};

export function getRangePickerProps({
  periodType = 'minute',
  periodValue = 1
}: PeriodData): RangePickerProps {
  if (periodType === 'minute') {
    const defaultDisabledMinutes = getDisabledMinutes(periodValue);

    return {
      showTime: {
        format: 'HH:mm'
      },
      format: 'YYYY-MM-DD HH:mm',
      picker: undefined,
      disabledTime: (current) => {
        const now = moment();
        const hour = now.hour();
        const minute = now.minute();
        //@ts-ignore
        if (current && current.isBefore(now, 'days')) {
          return {
            disabledHours: () => [],
            disabledMinutes: () => {
              return defaultDisabledMinutes;
            }
          };
        }

        return {
          disabledHours: () => disabledRangeTime(hour + 1, 24),
          disabledMinutes: (selectedHour: number) => {
            if (selectedHour === hour) {
              return [...defaultDisabledMinutes, ...disabledRangeTime(minute + 1, 60)];
            } else if (selectedHour > hour) {
              return [...defaultDisabledMinutes, ...disabledRangeTime(1, 60)];
            }

            return defaultDisabledMinutes;
          }
        };
      }
    };
  }

  if (periodType === 'hour') {
    return {
      showTime: {
        format: 'HH'
      },
      format: 'YYYY-MM-DD HH',
      picker: undefined,
      disabledTime: (current) => {
        const now = moment();
        const hour = now.hour();
        //@ts-ignore
        if (current && current.isBefore(now, 'days')) {
          return {
            disabledHours: () => []
          };
        }

        return {
          disabledHours: () => disabledRangeTime(hour + 1, 24)
        };
      }
    };
  }

  if (periodType === 'day') {
    return {
      showTime: false,
      format: 'YYYY-MM-DD',
      picker: undefined
    };
  }

  if (periodType === 'month') {
    return {
      // @ts-ignore
      showTime: false,
      format: 'YYYY-MM',
      // @ts-ignore
      picker: 'month'
    };
  }

  if (periodType === 'year') {
    return {
      // @ts-ignore
      showTime: false,
      format: 'YYYY',
      // @ts-ignore
      picker: 'year'
    };
  }

  return {};
}
