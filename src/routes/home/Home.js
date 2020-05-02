import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

function Home(props) {
  return (
    <Typography>
      <h1>{props.title}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem
        cumque dignissimos ducimus ea esse ex, facilis iusto nam natus nemo
        numquam odit pariatur, quas quisquam quod quos ullam velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
        eius enim esse fuga incidunt ipsum iusto magni, maiores nam numquam quia
        quos recusandae, reiciendis repellat, tempora tenetur unde veniam
        veritatis?
        <b>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          consequatur eaque facilis ipsa iste, labore libero optio quam quas
          ratione sunt totam unde, voluptatibus? Ad dicta ipsum nemo odit
          veritatis.
        </b>
      </p>
    </Typography>
  );
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
