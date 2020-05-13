import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { GiCookingPot } from "react-icons/gi";
import { MdPeople } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import "./RecipeList.scss";

function RecipesList(props) {
  const { name, selectRecipe, rating, time, level, people, thumbnail } = props;
  return (
    <div
      className="recipes-list-card"
      onClick={() => selectRecipe(name, rating, time, level, people)}
    >
      <img src={thumbnail} alt={name} />
      <div className="card-info">
        <h2>{name}</h2>
        <StarRatings
          rating={rating}
          starRatedColor="#F7C233"
          numberOfStars={5}
          starDimension="20px"
        />
        <div className="extra-info">
          <div className="extra-info-wrapper">
            <AiFillClockCircle className="icon" />
            <p>{time}</p>
          </div>
          <div className="extra-info-wrapper">
            <MdPeople className="icon" />
            <p>{people}</p>
          </div>
          <div className="extra-info-wrapper">
            <GiCookingPot className="icon" />
            <p>{level}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

RecipesList.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  people: PropTypes.number.isRequired,
  selectRecipe: PropTypes.func.isRequired,
};

export default RecipesList;
