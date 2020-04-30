import React from 'react';
import Layout from '../../components/Layout';
import Dashboard from './Dashboard';

const title = 'Dashboard';
const description = "Description...";
const isLogin = false;

function action() {
  if (!isLogin) {
    return {redirect: '/login'};
  }

  return {
    chunks: ['dashboard'],
    title: title,
    description: description,
    component: (
      <Layout>
        <Dashboard title={title}/>
      </Layout>
    ),
  };
}

export default action;
