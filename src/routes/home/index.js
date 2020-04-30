import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

const title = 'React Single Page Application.';
const description = 'Description...';

function action() {
  return {
    chunks: ['home'],
    title,
    description,
    component: (
      <Layout>
        <Home title={title} />
      </Layout>
    ),
  };
}

export default action;
