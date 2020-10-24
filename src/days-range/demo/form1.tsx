import React from 'react';
import { Form, Button } from 'antd';
import { DaysRange } from '@alitajs/antd-plus';

export default () => {
  const [form] = Form.useForm();

  const handleSubmit = (vals: object) => {
    console.log(vals);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="horizontal">
      <Form.Item name="times" label="时间范围">
        <DaysRange type="radio" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
