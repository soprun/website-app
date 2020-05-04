import React from 'react';
import { Form, Input, Modal, Radio } from 'antd';

export const CollectionEdit = ({visible, confirmLoading, defaultValue, onHandler, onCancel}) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  return (
    <Modal
      visible={visible}
      confirmLoading={confirmLoading}
      title="Edit subscriber collection"
      // title={'Edit subscriber: ' + item.email}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
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
      <Form
        {...layout}
        form={form}
        initialValues={defaultValue}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input autoFocus={true}/>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone number"
          rules={[{required: false, message: 'Please input your phone number!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{required: true, message: 'Please input your gender!'}]}
        >
          <Radio.Group>
            <Radio.Button value="male" defaultChecked>Male</Radio.Button>
            <Radio.Button value="female">Female</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="language"
          label="Language"
          rules={[{required: true, message: 'Please input your language!'}]}
        >
          <Radio.Group>
            <Radio.Button value="en" defaultChecked>English</Radio.Button>
            <Radio.Button value="ru">Russian</Radio.Button>
            <Radio.Button value="kg">Kongo</Radio.Button>
            <Radio.Button value="uz">Uzbek</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
