import React from 'react';

function NumRecipes(props) {
	console.log(props.numRecipes);
	// return <div>{props.numRecipes === null ? <div>No recipes found</div> : props.numRecipes}</div>;

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
					</div>
					<br />
				</div>
			);
			break;
	}
}

export default NumRecipes;
