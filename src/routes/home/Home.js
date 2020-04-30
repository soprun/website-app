import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

function Home(props) {
  return (
    <Typography>
      <h1>{props.title}</h1>
      <p>
        In the process of internal desktop applications development, many
        different design specs and implementations would be involved, which
        might cause designers and developers difficulties and duplication and
        reduce the efficiency of development.
      </p>
      <p>
        After massive project practice and summaries, Ant Design, a design
        language for background applications, is refined by Ant UED Team, which
        aims to
        <b>
          uniform the user interface specs for internal background projects,
          lower the unnecessary cost of design differences and implementation
          and liberate the resources of design and front-end development
        </b>
      </p>
    </Typography>
  );
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
