import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  const { name, addFilter } = props;
  return (
    <div className="card" onClick={() => addFilter(name)}>
      <img
        src={`https://www.themealdb.com/images/ingredients/${name}-small.png`}
        alt={name}
      />
      <div className="title">
        <p>{name}</p>
      </div>
    </div>
  );
}

IngredientsList.propTypes = {
  name: PropTypes.string.isRequired,
  addFilter: PropTypes.func.isRequired,
};

export default IngredientsList;
