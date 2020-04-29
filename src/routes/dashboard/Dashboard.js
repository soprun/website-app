import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Dashboard.css';

export default function Dashboard({title}) {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>...</p>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
};
