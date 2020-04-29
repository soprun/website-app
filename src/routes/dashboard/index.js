import React from 'react';
import Layout from '../../components/Layout';
import Dashboard from './Dashboard';

const title = 'Dashboard';
const isLogin = false;

function action() {
  if (!isLogin) {
    return { redirect: '/login' };
  }

  return {
    chunks: ['dashboard'],
    title,
    component: (
      <Layout>
        <Dashboard title={title} />
      </Layout>
    ),
  };
}

export default action;
