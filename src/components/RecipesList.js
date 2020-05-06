import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function RecipeList(props) {
	const { showRecipes, name, selectRecipe } = props;
	return <div onClick={() => selectRecipe(name)}><Link to='/recipe'>{showRecipes ? name : ''}</Link></div>;
}

export default RecipeList;
