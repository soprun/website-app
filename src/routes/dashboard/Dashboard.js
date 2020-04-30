import React from 'react';
import PropTypes from 'prop-types';

export default function Dashboard({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>...</p>
    </div>
  );
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
};
