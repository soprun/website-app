import React from 'react';
import Layout from '../../components/Layout';

const title = 'Sign up';

function action() {
  return {
    chunks: ['register'],
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
