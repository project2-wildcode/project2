import React from "react";
import PropTypes from "prop-types";

function IngredientsList(props) {
  const { name, addFilter } = props;
  return (
    <div onClick={() => addFilter(name)}>
      <div>{name}</div>
      <img
        src={`https://www.themealdb.com/images/ingredients/${name}-small.png`}
        alt={name}
      />
    </div>
  );
}

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IngredientsList;
