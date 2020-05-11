import React from 'react';
//import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

function NumRecipes(props) {
  switch (props.numRecipes) {
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
		  <p className="num-of-recipes-info"><span>{numOfRecipes}</span> {numOfRecipes === 1 ? 'recipe': 'recipes'} avalible</p>
	    </div>
	  );
	}
}

export default NumRecipes;
