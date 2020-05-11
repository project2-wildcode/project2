import React from 'react';
//import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

function NumRecipes(props) {
	const { numRecipes } = props
  switch (numRecipes) {
	case 0:
	  return (
	    <div className="num-of-recipes-wrapper">
          <p className="num-of-recipes-info">click the cards to add <span>ingredients</span></p>
        </div>
	  );
	case null:
	  return (
		<div className="num-of-recipes-wrapper">
          <p className="num-of-recipes-info">sorry, no recipes avalible.<br/> <span>try other ingredients</span></p>
        </div>
	  );
	default:
	  return (
		<div className="num-of-recipes-wrapper">
		  <p className="num-of-recipes-info"><span>{numRecipes}</span> {numRecipes === 1 ? 'recipe': 'recipes'} avalible</p>
	    </div>
	  );
	}
}

export default NumRecipes;
