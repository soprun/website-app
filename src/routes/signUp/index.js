import React from 'react';
import Layout from '../../components/Layout';
import { PageHeader } from "antd";

const title = 'Sign up';

function action() {
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <PageHeader title={title} subTitle="This is a subtitle"/>
      </Layout>
    ),
  };
}

export default action;
