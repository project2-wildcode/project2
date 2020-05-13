import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';


function NumRecipes(props) {
  const { numRecipes } = props;
  switch (numRecipes) {
    case 0:
      return (
        <div className="search-info">
          <p>
            click the cards to add
            <span> ingredients</span>
          </p>
        </div>
      );
    case null:
      return (
        <div className="search-info">
          <p>
            sorry, no recipes avalible.
            <br />
            <span> try other ingredients</span>
          </p>
        </div>
      );
    default:
      return (
        <div className="search-info">
          <p>
            <span>{numRecipes} </span>
            {numRecipes === 1 ? "recipe " : "recipes "}
            available
          </p>
          <IoIosArrowUp className="icon" />
        </div>
      );
  }
}

NumRecipes.propTypes = {
  numRecipes: PropTypes.func.isRequired,
};
export default NumRecipes;
