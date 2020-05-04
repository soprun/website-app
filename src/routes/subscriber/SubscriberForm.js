import React from 'react';
import { Checkbox, Divider, Form, Input, Modal, Select } from 'antd';

export const SubscriberForm = ({visible, confirmLoading, value, onCreate, onCancel}) => {
  const [form] = Form.useForm();

  const initialValues = {
    id: null,
    firstName: null,
    lastName: null,
    gender: 'unknown',
    language: 'en',
    email: null,
    emailConfirmed: false,
    phone: null,
    phoneConfirmed: false,
    website: null,
    ...value
  };

  const layout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 18
    },
  };

  return <Modal
    visible={visible}
    confirmLoading={confirmLoading}
    title="Create a new collection"
    onCancel={() => {
      // form.resetFields()
      return onCancel();
    }}
    onOk={() => {
      form
        .validateFields()
        .then(values => {
          console.log('onOk, form', values);
          form.resetFields();
          onCreate(values);
        })
        .catch(info => {
          console.log('Validate Failed:', info);
        });
    }}
  >
    <Form
      {...layout}
      form={form}
      layout="horizontal"
      name="form_in_modal"
      initialValues={initialValues}
    >
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
        <Select placeholder="Select a option and change input text above">
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="ru">Russian</Select.Option>
          <Select.Option value="kg">Kongo</Select.Option>
          <Select.Option value="uz">Uzbek</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{
        required: true,
        message: 'Please input your gender!'
      }]}>
        <Select>
          {/*<Select.Option disabled={true}>unknown</Select.Option>*/}
          <Select.Option value="male">male</Select.Option>
          <Select.Option value="female">female</Select.Option>
        </Select>
      </Form.Item>
      <Divider>User contacts</Divider>
      <Form.Item name="email" label="E-mail" rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: false,
          message: 'Please input your E-mail!'
        }
      ]}>
        <Input/>
      </Form.Item>
      <Form.Item {...tailLayout} name="emailConfirmed" valuePropName="checked">
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
      <Form.Item {...tailLayout} name="phoneConfirmed" valuePropName="checked">
        <Checkbox>Phone confirmed</Checkbox>
      </Form.Item>
      <Form.Item name="website" label="Website" rules={[
        {
          required: false,
          message: 'Please input your website!'
        }
      ]}>
        <Input/>
      </Form.Item>
      <Form.Item name="id" label={false} style={{display: 'none'}}>
        <Input type="hidden"/>
      </Form.Item>
    </Form>
  </Modal>;
}
