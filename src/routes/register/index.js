import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';

const title = 'Sign up';

export default function action() {
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <Register title={title}/>
      </Layout>
    ),
  };
}
