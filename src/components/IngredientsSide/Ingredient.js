import React, { Component } from "react";
import axios from "axios";
import IngredientsList from "./IngredientsList";
import Filters from "./Filters";
import SearchBar from "../SharedComponents/SearchBar/SearchBar";
import RecipesList from "../SharedComponents/RecipeList/RecipesList";
import NumRecipes from "./NumRecipes";
import SortBy from "../SharedComponents/SortBy/SortBy";
import "./Ingredient.scss";

const ratingArr = [1, 2, 3, 4, 5];
const timeArr = [30, 45, 60, 90];
const levelArr = ["Easy", "Medium", "Hard"];
const peopleArr = [1, 2, 3, 4];

function randomNum(num) {
  return Math.floor(Math.random() * num);
}

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allIngredients: [],
      ingredientsList: [],
      searchValue: "",
      filters: [],
      recipesList: [],
    };
  }

  componentDidMount() {
    const url = "https://www.themealdb.com/api/json/v2/9973533/list.php?i=ingredient";
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((ingredientsData) => {
        this.setState({
          ingredientsList: ingredientsData,
          allIngredients: ingredientsData,
        });
      });
  }

  addFilter = (name) => {
    const { filters } = this.state;
    const currentFilters = [...filters];
    let updatedFilters = currentFilters;
    if (!currentFilters.includes(name)) {
      updatedFilters = [name, ...currentFilters];
    }
    this.setState({ filters: updatedFilters });
    this.addRecipes(updatedFilters);
  };

  removeFilter = (name) => {
    const { filters } = this.state;
    const newFilters = filters.filter((filter) => filter !== name);
    this.setState({ filters: newFilters });
    this.addRecipes(newFilters);
  };

  handleChange = (event) => {
    const { value } = event.target;
    const { allIngredients } = this.state;
    const filteredIngredients = allIngredients.filter((ingredient) => (
      ingredient.strIngredient
        .toLowerCase()
        .includes(value.toLowerCase())
    ));
    this.setState({
      searchValue: value,
      ingredientsList: filteredIngredients,
    });
  };

  addRecipes = (filters) => {
    let searchIngredients = null;

    if (filters.length === 1) {
      searchIngredients = filters[0].split(" ").join("_");
    }

    if (filters.length > 1) {
      searchIngredients = filters
        .map((filter) => filter.split(" ").join("_"))
        .join(",");
    }

    const url = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${searchIngredients}`;

    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((recipesListData) => {
        if (searchIngredients === null) {
          this.setState({ recipesList: [] });
        } else if (recipesListData === null) {
          this.setState({ recipesList: null });
        } else {
          const updatedRecipesList = recipesListData.map((recipe) => {
            const extraInfo = {
              rating: ratingArr[randomNum(5)],
              time: timeArr[randomNum(4)],
              level: levelArr[randomNum(3)],
              people: peopleArr[randomNum(4)],
            };
            return { ...recipe, ...extraInfo };
          });
          const sortedList = updatedRecipesList.sort((recipeA, recipeB) => (
            recipeB.rating - recipeA.rating
          ));
          this.setState({ recipesList: sortedList });
        }
      });
  };

  selectRecipe = (
    name,
    recipeRating,
    recipeTime,
    recipeLevel,
    recipePeople
  ) => {
    const searchValue = name.split(" ").join("_");
    const { history } = this.props;
    history.push({
      pathname: "/recipe",
      state: {
        name: searchValue,
        rating: recipeRating,
        time: recipeTime,
        level: recipeLevel,
        people: recipePeople,
        from: "ingredients",
      },
    });
  };

  handleSortByChange = (event) => {
    const { value } = event.target;
    const { recipesList } = this.state;

    if (value === "time") {
      const sortedList = recipesList.sort((recipeA, recipeB) => (
        recipeA.time - recipeB.time
      ));
      this.setState({ recipesList: sortedList });
    } else {
      const sortedList = recipesList.sort((recipeA, recipeB) => (
        recipeB.rating - recipeA.rating
      ));
      this.setState({ recipesList: sortedList });
    }
  };

  render() {
    const {
      ingredientsList,
      filters,
      searchValue,
      recipesList
    } = this.state;

    return (
      <div className="page-wrapper">
        <div className="ingredients-left-container">
          <h1 className="ingredients-title">Ingredients</h1>
          <SearchBar
            input={searchValue}
            handleChange={this.handleChange}
            placeholder="ingredients"
          />
          <div className="filters-container">
            {filters.map((filter) => (
              <Filters
                key={filter}
                name={filter}
                removeFilter={this.removeFilter}
              />
            ))}
          </div>
          <div className="ingredients-cards-container">
            {ingredientsList.map((ingredient) => (
              <IngredientsList
                key={ingredient.idIngredient}
                name={ingredient.strIngredient}
                addFilter={this.addFilter}
              />
            ))}
          </div>
        </div>

        <div className="ingredients-container-right">
          <NumRecipes
            numRecipes={recipesList === null ? null : recipesList.length}
          />
          <SortBy handleSortByChange={this.handleSortByChange} />
          <div className="recipes-list-container">
            {recipesList !== null
            && (
              recipesList.map((recipe) => (
                <RecipesList
                  key={recipe.idMeal}
                  name={recipe.strMeal}
                  thumbnail={recipe.srtMealThumb}
                  rating={recipe.rating}
                  time={recipe.time}
                  level={recipe.level}
                  people={recipe.people}
                  selectRecipe={this.selectRecipe}
                />
              )))}
          </div>
        </div>
      </div>
    );
  }
}

export default Ingredient;
