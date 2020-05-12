import React from "react";
import axios from "axios";
import SearchBar from "../SharedComponents/SearchBar";
import RecipesList from "../SharedComponents/RecipesList";
import CategoriesList from "./categoriesList";
import SortBy from "../SharedComponents/SortBy";

const rating = [1, 2, 3, 4, 5];
const time = [30, 45, 60, 90];
const level = ["Easy", "Medium", "Hard"];
const people = [1, 2, 3, 4];

function randomNum(num) {
  return Math.floor(Math.random() * num);
}

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesList: [],
      categories: [],
      chosenCategory: "",
      searchValue: "",
    };
  }

  componentDidMount() {
    const url = "https://www.themealdb.com/api/json/v2/9973533/categories.php";
    axios
      .get(url)
      .then((response) => response.data.categories)
      .then((categoriesData) => {
        this.setState({ categories: categoriesData });
      });
  }

  getRecipesByCat = (name) => {
    const url = `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${name}`;
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((recipesListData) => {
        const updatedRecipesList = recipesListData.map((recipe) => {
          const extraInfo = {
            rating: rating[randomNum(5)],
            time: time[randomNum(4)],
            level: level[randomNum(3)],
            people: people[randomNum(4)],
          };
          return { ...recipe, ...extraInfo };
        });
        const sortedList = updatedRecipesList.sort((recipeA, recipeB) => {
          return recipeB.rating - recipeA.rating;
        });
        this.setState({
          recipesList: sortedList,
          chosenCategory: name,
        });
      });
  };

  handleChangeRecipes = (event) => {
    const { value } = event.target;
    const url = `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${value}`;
    if (value.length > 0) {
      axios
        .get(url)
        .then((response) => response.data.meals)
        .then((recipesData) => {
          if (recipesData === null) {
            this.setState({
              recipesList: [],
              searchValue: value,
            });
          } else {
            const updatedRecipesList = recipesData.map((recipe) => {
              const extraInfo = {
                rating: rating[randomNum(5)],
                time: time[randomNum(4)],
                level: level[randomNum(3)],
                people: people[randomNum(4)],
              };
              return { ...recipe, ...extraInfo };
            });
            const sortedList = updatedRecipesList.sort((recipeA, recipeB) => {
              return recipeB.rating - recipeA.rating;
            });
            this.setState({
              recipesList: sortedList,
              searchValue: value,
            });
          }
        });
    } else {
      /* added */
      this.setState({
        searchValue: value,
        recipesList: [],
      });
    }
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
      const sortedList = recipesList.sort(
        (recipeA, recipeB) => recipeA.time - recipeB.time
      );
      this.setState({ recipesList: sortedList });
    } else {
      const sortedList = recipesList.sort(
        (recipeA, recipeB) => recipeB.rating - recipeA.rating
      );
      this.setState({ recipesList: sortedList });
    }
  };

  render() {
    const { categories, recipesList, searchValue } = this.state;
    return (
      <div className="page-wrapper">
        <div className="recipes-container-left">
          <h1 className="recipes-title">Recipes</h1>
          <SearchBar
            input={searchValue}
            handleChange={this.handleChangeRecipes}
            placeholder="recipes"
          />
          <div className="categories-cards-container">
            {categories.map((category) => (
              <CategoriesList
                key={category.idCategory}
                name={category.strCategory}
                thumbnail={category.strCategoryThumb}
                getRecipesByCat={this.getRecipesByCat}
              />
            ))}
          </div>
        </div>
        <div className="recipes-container-right">
          <SortBy handleSortByChange={this.handleSortByChange} />
          <div className="recipes-list-container">
            {recipesList.length !== 0 ? (
              recipesList.map((recipeData) => (
                <RecipesList
                  key={recipeData.idMeal}
                  name={recipeData.strMeal}
                  thumbnail={recipeData.strMealThumb}
                  rating={recipeData.rating}
                  time={recipeData.time}
                  level={recipeData.level}
                  people={recipeData.people}
                />
              ))
            ) : (
              <div>No recipes found</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;
