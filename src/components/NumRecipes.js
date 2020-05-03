import React from 'react';

function NumRecipes(props) {
	switch (props.numRecipes) {
		case 0:
			return (
				<div>
					<b>Please choose your ingredients</b>
				</div>
			);
			break;
		case null:
			return (
				<div>
					<b>No recipes found</b>
				</div>
			);
			break;
		default:
			return (
				<div>
					<div>
						<b>{props.numRecipes} recipes found</b>
						<button onClick={props.showButton}>{props.showRecipes ? 'Hide' : 'Show'}</button>
					</div>
					<br />
				</div>
			);
			break;
	}
}

export default NumRecipes;
