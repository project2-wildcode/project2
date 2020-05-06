import React from 'react';
import PropTypes from 'prop-types';

function RecipeList(props) {
	return <div>{props.showRecipes ? props.name : ''}</div>;
}

export default RecipeList;
