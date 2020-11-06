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

const getDisabledTimes = (value: number, max: number = 60) => {
  const minutes: number[] = [];

  for (let i = 0; i < max; i++) {
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
  if (periodType === 'second') {
    const defaultDisabled = getDisabledTimes(periodValue);

    return {
      showTime: {
        format: 'HH:mm:ss'
      },
      format: 'YYYY-MM-DD HH:mm:ss',
      picker: undefined,
      disabledTime: (current) => {
        const currentDate = moment();
        const hour = currentDate.hour();
        const minute = currentDate.minute();
        const second = currentDate.second();

        // 如果上今天之前的则不限制
        if (current && current.isBefore(currentDate, 'days')) {
          return {
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => defaultDisabled
          };
        }

        return {
          disabledHours: () => {
            return disabledRangeTime(hour + 1, 24);
          },
          disabledMinutes: (selectedHour: number) => {
            if (selectedHour === hour) {
              return disabledRangeTime(minute + 1, 60);
            } else if (selectedHour > hour) {
              return disabledRangeTime(1, 60);
            } else {
              return [];
            }
          },
          disabledSeconds: (selectedHour: number, selectedMinute: number) => {
            if (selectedHour === hour) {
              if (selectedMinute === minute) {
                return disabledRangeTime(second + 1, 60).concat(defaultDisabled);
              }

              if (selectedMinute > minute) {
                return disabledRangeTime(1, 60).concat(defaultDisabled);
              }
            }

            if (selectedHour > hour) {
              return disabledRangeTime(1, 60).concat(defaultDisabled);
            }

            return defaultDisabled;
          }
        };
      }
    }
  }

  if (periodType === 'minute') {
    const defaultDisabled = getDisabledTimes(periodValue);

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
        if (current && current.isBefore(now, 'days')) {
          return {
            disabledHours: () => [],
            disabledMinutes: () => {
              return defaultDisabled;
            }
          };
        }

        return {
          disabledHours: () => disabledRangeTime(hour + 1, 24),
          disabledMinutes: (selectedHour: number) => {
            if (selectedHour === hour) {
              return [...defaultDisabled, ...disabledRangeTime(minute + 1, 60)];
            } else if (selectedHour > hour) {
              return [...defaultDisabled, ...disabledRangeTime(1, 60)];
            }

            return defaultDisabled;
          }
        };
      }
    };
  }

  if (periodType === 'hour') {
    const defaultDisabled = getDisabledTimes(periodValue, 24);

    return {
      showTime: {
        format: 'HH'
      },
      format: 'YYYY-MM-DD HH',
      picker: undefined,
      disabledTime: (current) => {
        const now = moment();
        const hour = now.hour();
        if (current && current.isBefore(now, 'days')) {
          return {
            disabledHours: () => defaultDisabled
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
      showTime: false,
      format: 'YYYY-MM',
      picker: 'month'
    } as RangePickerProps;
  }

  if (periodType === 'year') {
    return {
      showTime: false,
      format: 'YYYY',
      picker: 'year'
    } as RangePickerProps;
  }

  return {};
}
