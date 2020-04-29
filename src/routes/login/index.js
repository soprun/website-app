import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Log in';

export default function action() {
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <Login title={title} />
      </Layout>
    ),
  };
}
