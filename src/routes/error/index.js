import React from 'react';
import ErrorPage from './ErrorPage';

function action() {
  return {
    title: 'Sorry, a critical error occurred on this page',
    component: <ErrorPage />,
  };
}

export default action;
