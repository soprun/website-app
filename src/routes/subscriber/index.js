import React from 'react';
import { PageHeader } from 'antd';
import Layout from '../../components/Layout';
import Subscriber from "./Subscriber";

const title = 'Subscriber list';
const subTitle = 'This is a subtitle...';

function action() {
  return {
    chunks: ['subscriber'],
    title,
    component: (
      <Layout>
        <PageHeader title={title} subTitle={subTitle}/>
        <Subscriber/>
      </Layout>
    ),
  };
}

export default action;
