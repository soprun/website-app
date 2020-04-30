import React from 'react';
import Layout from '../../components/Layout';

const title = 'Log in';

function action() {
  return {
    chunks: ['login'],
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
