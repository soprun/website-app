import React from 'react';
import Layout from '../../components/Layout';

const title = 'Log out';

function action() {
  return {
    chunks: ['logout'],
    title: title,
    component: (
      <Layout>
        <div>
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </Layout>
    ),
  };
}

export default action;
