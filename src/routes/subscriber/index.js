import React from 'react';
import Layout from '../../components/Layout';
import { Subscriber } from "./Subscriber";
import { PageHeader } from "antd";

const title = 'Subscriber list';
const subTitle = 'This is a subtitle...';

function action() {
  return {
    chunks: ['subscriber'],
    title,
    component: (
      <Layout>
        {/*<PageHeader title={title} subTitle={subTitle}/>*/}
        <Subscriber title={title} subTitle={subTitle}/>
      </Layout>
    ),
  };
}

export default action;
