import React from 'react';
import Page from '../../components/Page';

const title = 'React Starter Kit';

async function action() {
  return {
    chunks: ['home'],
    title: title,
    component: (
      <Page>
        <div>p</div>
      </Page>
    ),
  };
}

export default action;

