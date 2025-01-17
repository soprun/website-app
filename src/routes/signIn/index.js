import React from 'react';
import Layout from '../../components/Layout';
import SignIn from './SignIn';
import { PageHeader } from "antd";

const title = 'Sign in';

function action() {
  return {
    chunks: ['signIn'],
    title,
    component: (
      <Layout>
        <PageHeader title={title} subTitle="This is a subtitle"/>
        <SignIn />
      </Layout>
    ),
  };
}

export default action;
