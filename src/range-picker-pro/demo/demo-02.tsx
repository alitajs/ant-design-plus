import React from 'react';
import moment from 'moment';
import { RangePickerPro } from '@alitajs/antd-plus';

export default () => {
  return (
    <RangePickerPro
      options={[
        { label: '15分钟', value: 'minute', periodValue: 15 }
      ]}
      disabledSelect
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
