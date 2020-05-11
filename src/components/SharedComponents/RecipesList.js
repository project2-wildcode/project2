import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipesList(props) {
	const { showRecipes, name, selectRecipe, rating, time, level, people, pic } = props;
	return (
		<div>
			<div onClick={() => selectRecipe(name, rating, time, level, people)}>
				<Link to="/recipe">{showRecipes ? name : ''}</Link>
			</div>
			<div>
				<p>Recipe:{name}</p>
				<img src={pic} alt={pic} />
				<p>Rating:{rating}</p>
				<p>Preparation time:{time} minutes</p>
				<p>Dificulty:{level}</p>
				<p>number of people:{people}</p>
			</div>
		</div>
	);
}

export default RecipesList;
