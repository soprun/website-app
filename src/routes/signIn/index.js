import React from 'react';
import Layout from '../../components/Layout';
import SignIn from './SignIn';

const title = 'Sign in';

function action() {
  return {
    chunks: ['signIn'],
    title,
    component: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  };
}

export default action;
