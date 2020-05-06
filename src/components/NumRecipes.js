import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

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
						<div onClick={props.showButton}>
							{props.showRecipes ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
						</div>
					</div>
					<br />
				</div>
			);
			break;
	}
}

export default NumRecipes;
