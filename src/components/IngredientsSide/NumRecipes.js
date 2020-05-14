import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';


function NumRecipes(props) {
  const { numRecipes, toggleBottomTab, isBottomTabExpanded } = props;
  switch (numRecipes) {
    case 0:
      return (
        <div className="num-of-recipes-info">
          <p>
            click the cards to add
            <span> ingredients</span>
          </p>
        </div>
      );
    case null:
      return (
        <div className="num-of-recipes-info">
          <p>
            sorry, no recipes avalible.
            <br />
            <span> try other ingredients</span>
          </p>
        </div>
      );
    default:
      return (
        <div className="num-of-recipes-info">
          <p>
            <span>
              {`${numRecipes} `}
            </span>
            {numRecipes === 1 ? "recipe " : "recipes "}
            available
          </p>
          {isBottomTabExpanded ? <IoIosArrowDown onClick={toggleBottomTab} className="toggle-bottom-tab-icon" /> : <IoIosArrowUp onClick={toggleBottomTab} className="toggle-bottom-tab-icon" />}
        </div>
      );
  }
}

NumRecipes.propTypes = {
  numRecipes: PropTypes.func.isRequired,
};
export default NumRecipes;
