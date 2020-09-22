import moment, { Moment } from 'moment';
import { round } from 'lodash';
import { TimeData } from './interface';

export type TimeRangeInput = (string | Moment)[];

/**
 * 处理查询时间
 *   将开始时间处理为当天 day 00:00:00
 *   将结束时间处理为当天 day 59:59:59
 * @param dates
 * @example
 *   ['2019-11-01', '2019-11-11']
 *   处理成 ['2019-11-01 00:00:00', '2019-11-11 59:59:59']
 *   再转换为时间戳
 */
export function processQueryTimeRange(times: TimeRangeInput = []): number[] {
  if (times.length !== 2) return [];

  return times.map((item, index) => {
    if (!moment.isMoment(item)) {
      item = moment(item);
    }
    if (index === 0) {
      return item.startOf('day').valueOf();
    } else {
      return item.endOf('day').valueOf();
    }
  });
}

/**
 * 转换天数为时间范围
 * @param val
 */
export function transformDayToTimeRange(val: number): Moment[] {
  const beginTime = moment().subtract(val - 1, 'days');

  return [beginTime, moment()];
}

/**
 *
 * @param val 转换时间范围为天数
 */
export function transformTimeRangeToDay(val: TimeData): number {
  return round((val.endTime - val.startTime) / (1000 * 24 * 60 * 60), 0);
}
