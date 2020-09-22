import React, { FC, useEffect } from 'react';
import { Form, Button } from 'antd';
// @ts-ignore
import { DaysRange } from '@alitajs/antd-plus';

const Example: FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      times: 9
    });
  }, []);

  const handleSubmit = (vals) => {
    console.log(vals);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="horizontal">
      <Form.Item name="times" label="时间范围">
        <DaysRange marks={[1, 7, 30]} type="radio" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Example;
