import React from "react";
import axios from "axios";
import IngredientsList from "./IngredientsList";
import Filters from "./Filters";
import SearchBar from "../SharedComponents/SearchBar";
import RecipesList from "../SharedComponents/RecipesList";
import NumRecipes from "./NumRecipes";

const Arrrating = [1, 2, 3, 4, 5];
const Arrtime = [30, 45, 60, 90];
const Arrlevel = ["Easy", "Medium", "Hard"];
const Arrpeople = [1, 2, 3, 4];

function randomNum(num) {
  return Math.floor(Math.random() * num);
}

class Ingredient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allIngredients: [],
      ingredientsList: [],
      searchInputValue: "",
      filters: [],
      recipesList: [],
      showRecipes: false,
    };
  }

  componentDidMount() {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=ingredient";
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

  addRecipes = (filters) => {
    let searchValue = null;

    if (filters.length === 1) {
      searchValue = filters[0].split(" ").join("_");
    }

    if (filters.length > 1) {
      searchValue = filters
        .map((filter) => filter.split(" ").join("_"))
        .join(",");
    }

    let url = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${searchValue}`;

    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((recipesListData) => {
        if (searchValue === null) {
          this.setState({ recipesList: [] });
        } else if (recipesListData === null) {
          this.setState({ recipesList: recipesListData });
        } else {
          const updatedRecipesList = recipesListData.map((recipe) => {
            const extraInfo = {
              rating: Arrrating[randomNum(5)],
              time: Arrtime[randomNum(4)],
              level: Arrlevel[randomNum(3)],
              people: Arrpeople[randomNum(4)],
            };
            return { ...recipe, ...extraInfo };
          });
          this.setState({ recipesList: updatedRecipesList });
        }
      });
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
    const filteredIngredients = allIngredients.filter((ingredient) => {
      return ingredient.strIngredient
        .toLowerCase()
        .includes(value.toLowerCase());
    });
    this.setState({
      searchInputValue: value,
      ingredientsList: filteredIngredients,
    });
  };

  handleClickShowRecipes = () => {
    this.setState((prevState) => {
      return { showRecipes: !prevState.showRecipes };
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
    const {
      ingredientsList,
      filters,
      searchInputValue,
      recipesList,
    } = this.state;

    return (
      <div className="ingredients-container">
        <h1>Ingredients</h1>
        <SearchBar
          input={searchInputValue}
          handleChange={this.handleChange}
          addRecipes={this.addRecipes}
        />
        <div>
          <NumRecipes
            numRecipes={recipesList === null ? null : recipesList.length}
            showButton={this.handleClickShowRecipes}
            showRecipes={this.state.showRecipes}
          />
        </div>
        <div>
          {recipesList !== null &&
            recipesList.map((recipe) => (
              <RecipesList
                showRecipes={this.state.showRecipes}
                selectRecipe={this.selectRecipe}
                name={recipe.strMeal}
                key={recipe.idMeal}
                rating={recipe.rating}
                time={recipe.time}
                level={recipe.level}
                people={recipe.people}
              />
            ))}
        </div>
        <div className="filters-container">
          {filters.map((filter) => (
            <Filters
              name={filter}
              removeFilter={this.removeFilter}
              key={filter}
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
    );
  }
}

export default Ingredient;
