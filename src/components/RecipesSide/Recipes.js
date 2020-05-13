import React from "react";
import axios from "axios";
import { IoMdClose, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchBar from "../SharedComponents/SearchBar/SearchBar";
import RecipesList from "../SharedComponents/RecipeList/RecipesList";
import CategoriesList from "./categoriesList";
import SortBy from "../SharedComponents/SortBy/SortBy";
import "./Recipes.scss";

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
        const sortedList = updatedRecipesList.sort((recipeA, recipeB) => (
          recipeB.rating - recipeA.rating
        ));
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
            const sortedList = updatedRecipesList.sort((recipeA, recipeB) => (
              recipeB.rating - recipeA.rating
            ));
            this.setState({
              recipesList: sortedList,
              searchValue: value,
            });
          }
        });
    } else {
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
    const {
      categories,
      recipesList,
      searchValue,
      chosenCategory
    } = this.state;
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
          {chosenCategory === "" && searchValue === "" && (
            <div className="search-info">
              <p>
                choose a
                <span> category </span>
                or search recipe by
                <span> name</span>
              </p>
            </div>
          )}
          {chosenCategory !== "" && (
            <div className="search-info">
              <p>
                all recipes for
                <span>{` ${chosenCategory}`}</span>
              </p>
              <IoMdClose className="close" onClick={this.toggleBottomTab} />
            </div>
          )}
          {searchValue !== "" && recipesList.length !== 0 && (
            <div className="search-info">
              <p>
                <span>{`${recipesList.length} `}</span>
                recipes avalible
              </p>
            </div>
          )}
          {recipesList.length !== 0 && (
            <SortBy handleSortByChange={this.handleSortByChange} />
          )}
          <div className="recipes-list-container">
            {searchValue !== "" && recipesList.length === 0 ? (
              <div className="search-info">
                <p>
                  <span>sorry, </span>
                  no recipes match your search
                </p>
              </div>
            ) : (
              recipesList.map((recipeData) => (
                <RecipesList
                  key={recipeData.idMeal}
                  name={recipeData.strMeal}
                  thumbnail={recipeData.strMealThumb}
                  rating={recipeData.rating}
                  time={recipeData.time}
                  level={recipeData.level}
                  people={recipeData.people}
                  selectRecipe={this.selectRecipe}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;
