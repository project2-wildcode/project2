import React from "react";
import SearchBar from "../SharedComponents/SearchBar";
import axios from "axios";
import RecipesList from "../SharedComponents/RecipesList";
import CategoriesList from "../RecipesSide/categoriesList";

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
      recipesAPI: "",
      searchInputRecipes: "",
      recipesFound: [],
      categories: [],
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
        this.setState({
          recipesFound: updatedRecipesList,
        });
        console.log(updatedRecipesList);
      });
  };

  handleChangeRecipes = (event) => {
    const value = event.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((recipesData) => {
        this.setState({
          recipesFound: recipesData,
          searchInputRecipes: value,
        });
      });
  };

  selectRecipe = (
    name,
    recipeRating,
    recipeTime,
    recipeLevel,
    recipePeople
  ) => {
    console.log(name);
    const searchValue = name.split(" ").join("_");
    const { history } = this.props;
    history.push({
      pathname: "/recipe",
      state: {
        recipeName: searchValue,
        rating: recipeRating,
        time: recipeTime,
        level: recipeLevel,
        people: recipePeople,
        from: "ingredients",
      },
    });
  };

  render() {
    return (
      <div>
        <div>
          <SearchBar
            input={this.state.searchInputRecipes}
            handleChange={this.handleChangeRecipes}
            placeholder={"recipes"}
          />
        </div>
        <div>
          {this.state.categories.map((category) => (
            <CategoriesList
              key={category.idCategory}
              name={category.strCategory}
              thumbnail={category.strCategoryThumb}
              getRecipesByCat={this.getRecipesByCat}
            />
          ))}
        </div>
        <div>
          {this.state.recipesFound !== null
            ? this.state.recipesFound.map((recipeData) => (
                <RecipesList
                  recipesFoundName={recipeData.strMeal}
                  recipesFoundPic={recipeData.strMealThumb}
                  key={recipeData.idMeal}
                  rating={recipeData.rating}
                  time={recipeData.time}
                  level={recipeData.level}
                  people={recipeData.people}
                />
              ))
            : "No recipes found"}
        </div>
      </div>
    );
  }
}

export default Recipes;
