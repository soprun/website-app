import React from 'react';
import Layout from '../../components/Layout';
import Dashboard from './Dashboard';

const title = 'Dashboard';
const description = 'Description...';
const isAuthenticated = true;

function action() {
  return {
    chunks: ['dashboard'],
    title,
    description,
    isAuthenticated,
    component: (
      <Layout>
        <Dashboard title={title} />
      </Layout>
    ),
  };
}

export default action;
