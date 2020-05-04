import React from 'react';
import { Checkbox, Divider, Form, Input, Modal, Radio, Select } from 'antd';

export const CollectionEdit = ({visible, confirmLoading, defaultValue, onHandler, onCancel}) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <Modal
      visible={visible}
      confirmLoading={confirmLoading}
      title="Edit subscriber"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel(onCancel)
      }}
      onOk={() => {
        form.validateFields()
          .then(values => {
            console.log('Validate success:', values);
            form.resetFields();
            onHandler(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info || null);
          });
      }}
    >
      <Form{...layout} form={form} initialValues={defaultValue}>
        <Divider>User info</Divider>
        <Form.Item name="firstName" label="First name">
          <Input/>
        </Form.Item>
        <Form.Item name="lastName" label="Last name">
          <Input/>
        </Form.Item>
        <Form.Item name="language" label="Language" rules={[{
          required: true,
          message: 'Please input your language!'
        }]}>
          <Select placeholder="Select a option and change input text above" allowClear>
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="ru">Russian</Select.Option>
            <Select.Option value="kg">Kongo</Select.Option>
            <Select.Option value="uz">Uzbek</Select.Option>
            <Select.Option value="unknown">unknown</Select.Option>
          </Select>
        </Form.Item>
        <Divider>User contacts</Divider>
        <Form.Item name="website" label="Website" rules={[
          {
            required: false,
            message: 'Please input your website!'
          }
        ]}>
          <Input/>
        </Form.Item>
        <Form.Item name="email" label="E-mail" rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}>
          <Input/>
        </Form.Item>
        <Form.Item{...tailLayout} name="emailConfirmed" valuePropName="checked">
          <Checkbox>Email confirmed</Checkbox>
        </Form.Item>
        <Form.Item name="phone" label="Phone number" rules={[
          {
            required: false,
            message: 'Please input your phone number!'
          }
        ]}>
          <Input/>
        </Form.Item>
        <Form.Item{...tailLayout} name="phoneConfirmed" valuePropName="checked">
          <Checkbox>Phone confirmed</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}
