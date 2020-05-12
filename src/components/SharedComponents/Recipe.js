import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import { GiCookingPot } from 'react-icons/gi';
import { MdPeople, MdArrowBack } from 'react-icons/md';
import { AiFillClockCircle } from 'react-icons/ai';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeInfo: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { state } = location;
    const {
      name,
      rating,
      time,
      level,
      people,
    } = state;
    const url = `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${name}`;
    axios
      .get(url)
      .then((response) => response.data.meals[0])
      .then((recipeData) => {
        const newInfo = {
          recipeInfoRating: rating,
          perpTime: time,
          difficulty: level,
          numOfPeople: people,
        };
        const recipeUpdatedData = { ...recipeData, ...newInfo };
        this.setState({ recipeInfo: recipeUpdatedData });
      });
  }

  filteredIngredient = () => {
    const ingredients = [];
    const { recipeInfo } = this.state;
    for (let i = 1; i <= 20; i += 1) {
      const strIngredient = `strIngredient${i}`;
      const strMeasure = `strMeasure${i}`;
      if (recipeInfo[strIngredient] !== '' && recipeInfo[strIngredient] !== ' ' && recipeInfo[strIngredient] !== null) {
        if (recipeInfo[strMeasure] !== '' && recipeInfo[strMeasure] !== ' ' && recipeInfo[strMeasure] !== null) {
          ingredients.push(`${recipeInfo[strIngredient]} (${recipeInfo[strMeasure]}) `);
        } else {
          ingredients.push(recipeInfo[strIngredient]);
        }
      }
    }
    return ingredients;
  };

  render() {
    const { recipeInfo } = this.state;
    return (
      <div className="page-wrapper">
        <div className="recipeInfo-left-container">
          {recipeInfo.path === 'ingredients' ? (
            <Link to="/ingredients">
              <MdArrowBack className="go-back" />
            </Link>
          )
            : (
              <Link to="/recipeInfos">
                <MdArrowBack className="go-back" />
              </Link>
            )}
          <div className="recipeInfo-card">
            <img src={recipeInfo.strMealThumb} alt={recipeInfo.strMeal} />
            <div className="recipeInfo-info">
              <h2>{recipeInfo.strMeal}</h2>
              <StarRatings
                rating={recipeInfo.recipeInfoRating}
                starRatedColor="#f5b131"
                starDimension="20px"
                numberOfStars={5}
              />
              <div className="extra-info-container">
                <div className="extra-info">
                  <AiFillClockCircle className="icon" />
                  <p>{`${recipeInfo.perpTime} min`}</p>
                </div>
                <div className="extra-info">
                  <MdPeople className="icon" />
                  <p>{recipeInfo.numOfPeople}</p>
                </div>
                <div className="extra-info">
                  <GiCookingPot className="icon" />
                  <p>{recipeInfo.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="recipeInfo-left-container-bottom">
            <div className="left">
              <h2 className="recipeInfo-info-title">Category:</h2>
              <p>{recipeInfo.strCategory}</p>
              <h2 className="recipeInfo-info-title">Cusine</h2>
              <p>{recipeInfo.strArea}</p>
              <h2 className="tags">{recipeInfo.strTags}</h2>
            </div>
            <div className="right">
              <h2>Ingredients:</h2>
              {this.filteredIngredient().map((ingredient) => (
                <p className="ingredient">{ingredient}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="recipeInfo-container-right">
          <div className="instructions-title-wrapper">
            <h2 className="tab-title">Instructions:</h2>
            { /* bottomTabExpanded ? <IoIosArrowDown className="toggle-icon" onClick={toggleBottomTab} /> : <IoIosArrowUp className="toggle-icon" onClick={toggleBottomTab} /> */ }
          </div>
          <div className="instructions-wrapper-right">
            <h2 className="instructions-title">Instructions</h2>
            {recipeInfo.strInstructions !== undefined
              && (
                recipeInfo.strInstructions.map((instruction, index) => (
                  <p className="instructions">
                    <span>
                      {index + 1}
                      .
                    </span>
                    {' '}
                    {instruction}
                  </p>
                )))}

            <h2 className="video-title">Video:</h2>
            <a href={recipeInfo.strYoutube} target="_blank" rel="noopener noreferrer">click to get instructions on video</a>
          </div>
        </div>

      </div>
    );
  }
}

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  people: PropTypes.number.isRequired,
};

export default Recipe;
