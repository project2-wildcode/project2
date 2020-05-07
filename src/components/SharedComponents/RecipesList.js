
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function RecipesList(props) {
  const {
    showRecipes,
    name,
    selectRecipe,
    rating,
    time,
    level,
    people,
  } = props;
  return (
    <div onClick={() => selectRecipe(name, rating, time, level, people)}>
      <Link to="/recipe">{showRecipes ? name : ""}</Link>
    </div>
  );
}

export default RecipesList;
