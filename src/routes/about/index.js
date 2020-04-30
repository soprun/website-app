import React from 'react';
import Layout from '../../components/Layout';

const title = 'About page';

function action() {
  return {
    chunks: ['about'],
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
