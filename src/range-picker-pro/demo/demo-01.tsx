import React from 'react';
import moment from 'moment';
// @ts-ignore
import { RangePickerPro } from '@alitajs/antd-plus';

export default () => {
  return (
    <>
      <RangePickerPro
        options={[
          { label: '5秒钟', value: 'second', periodValue: 5 },
          { label: '15分钟', value: 'minute', periodValue: 15 },
          { label: '小时', value: 'hour', periodValue: 1 },
          { label: '日', value: 'day', periodValue: 1 },
          { label: '月', value: 'month', periodValue: 1 },
          { label: '年', value: 'year', periodValue: 1 },
        ]}
        defaultTimes={[
          moment().subtract(7, 'days').startOf('day'),
          moment().subtract(1, 'days').endOf('day')
        ]}
        onChange={(values) => {
          console.log('demo-01');
          if (!Array.isArray(values)) {
            values.rangeTime.forEach((item) => {
              console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'));
            });
          }
        }}
      />
    </>
  );
};
