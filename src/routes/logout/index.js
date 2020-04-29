import React from 'react';
import Layout from '../../components/Layout';

const title = 'Log out';

export default function action(context) {
  return {
    chunks: ['logout'],
    title,
    component: <Layout>logout</Layout>,
    status: 404,
  };
}
