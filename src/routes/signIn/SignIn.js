import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
  size: 'middle',
  initialValues: {
    email: "login@email.com",
    password: "secret"
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function SignIn() {
  const onFinish = values => {
    fetch('/signIn', {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }).then(response => {
      return response.text();
    }).then(token => {
      // Authorization: Bearer <token>
      // console.log(token);

      location.reload();
    });
  };

  return (
    <Form {...layout} onFinish={onFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input autoFocus="1"/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignIn;
