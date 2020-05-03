import React from 'react';
import { PageHeader } from 'antd';
import Layout from '../../components/Layout';
import Subscription from "./Subscription";

const title = 'Subscription list';

function action() {
  return {
    chunks: ['subscription'],
    title,
    component: (
      <Layout>
        <PageHeader title={title} subTitle="This is a subtitle"/>
        <Subscription/>
      </Layout>
    ),
  };
}

export default action;
