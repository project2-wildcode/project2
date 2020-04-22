import React from "react";
import PropTypes from "prop-types";
import { TiDelete } from "react-icons/ti";

function Filters(props) {
  const { name, removeFilter } = props;
  return (
    <div className="Element">
      <div>{name}</div>
      <TiDelete onClick={() => removeFilter(name)} className="icon delete" />
    </div>
  );
}

Filters.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Filters;
