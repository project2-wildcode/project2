import React from 'react';

function DisplayRecipes(props) {
	console.log(props.name);
	return <div>{props.name}</div>;
}

export default DisplayRecipes;
