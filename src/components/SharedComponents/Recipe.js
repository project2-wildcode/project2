import React, { Component } from "react";
import axios from "axios";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeInfo: [],
    };
  }

  componentDidMount() {
    const { name, rating, time, level, people } = this.props.location.state;
    const url = `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${name}`;
    axios
      .get(url)
      .then((response) => response.data.meals[0])
      .then((recipeData) => {
        const newInfo = {
          recipeRating: rating,
          perpTime: time,
          difficulty: level,
          numOfPeople: people,
        };
        const recipeUpdatedData = { ...recipeData, ...newInfo };
        this.setState({ recipeInfo: recipeUpdatedData });
      });
  }

  filteredIngredient = () => {
    let ingredients = [];
    const { recipeInfo } = this.state;
    for (let i = 1; i <= 20; i++) {
      let strIngredient = "strIngredient" + i;
      let strMeasure = "strMeasure" + i;
      if (strIngredient in recipeInfo) {
        ingredients.push(
          `${recipeInfo[strIngredient]} ${recipeInfo[strMeasure]} `
        );
      }
    }
    console.log(ingredients);
    return ingredients;
  };

  render() {
    const { recipeInfo } = this.state;
    console.log(this.props.location.state);
    console.log(this.state.recipeInfo);
    return (
      <div className="recipe-container">
        <div className="recipe-card">{recipeInfo.strMeal}</div>
        <div className="recipe-info">Difficulty:{recipeInfo.difficulty}</div>
        <div className="recipe-info">Rating:{recipeInfo.recipeRating}</div>
        <div className="recipe-info">
          Number of People:{recipeInfo.numOfPeople}
        </div>
        <img src={recipeInfo.strMealThumb} alt={recipeInfo.strMeal} />
        <div className="recipe-instructions">{recipeInfo.strInstructions}</div>
        <div className="ingredients">
          {this.filteredIngredient().map((ingredient) => (
            <p>{ingredient}</p>
          ))}
        </div>
        <div />
      </div>
    );
  }
}

export default Recipe;
