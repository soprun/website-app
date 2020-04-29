import React from 'react';
import Register from './Register';
import Page from "../../components/Page";

const title = 'Sign up';

export default function action() {
  return {
    chunks: ['register'],
    title,
    component: (
      <Page>
        <Register title={title} />
      </Page>
    ),
  };
}
