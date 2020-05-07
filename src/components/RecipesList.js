import React from 'react';

function RecipesList(props) {
	return (
		<div>
			<div>{props.recipesFoundName}</div>
			<img src={props.recipesFoundPic} alt={props.recipesFoundPic} />
		</div>
	);
}

export default RecipesList;
