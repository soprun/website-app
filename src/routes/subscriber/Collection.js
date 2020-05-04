import PropTypes from "prop-types";
import React from "react";

export default function Collection({items}) {
  return (
    <>
      <p>Collection</p>

      {items.items._key}
    </>
  );
}

// Collection.propTypes = {
//   items: PropTypes.shape({
//     _key: PropTypes.string.isRequired,
//     _loading: PropTypes.bool.isRequired,
//
//     id: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   }).isRequired,
// };
