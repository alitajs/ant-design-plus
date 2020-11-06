import React from 'react';
import moment from 'moment';
import { RangePickerPro } from '@alitajs/antd-plus';
import { RangePickerProProps } from '@alitajs/antd-plus/es/range-picker-pro';

const options: RangePickerProProps['options'] = [
  { label: '15分钟', value: 'minute' },
  { label: '小时', value: 'hour' },
  { label: '日', value: 'day' },
  { label: '月', value: 'month' },
  { label: '年', value: 'year' }
];

export default () => {
  return (
    <RangePickerPro
      periodValue={5}
      options={options}
      onChange={(values) => {
        if (!values) return;
        console.log('demo-02');
        if (Array.isArray(values)) {
          console.log('array');
          values.forEach((item) => {
            console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'));
          });
        } else {
          console.log('object');
          values.rangeTime.forEach((item) => {
            console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'));
          });
        }
      }}
    />
  );
};
