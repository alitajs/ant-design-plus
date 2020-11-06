import React from 'react';
import moment from 'moment';
// @ts-ignore
import { RangePickerPro } from '@alitajs/antd-plus';

export default () => {
  return (
    <RangePickerPro
      defaultTimes={[
        moment().subtract(7, 'days').startOf('day'),
        moment().subtract(1, 'days').endOf('day')
      ]}
      onChange={(values) => {
        if (!values) return;
        console.log('demo-03');
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
