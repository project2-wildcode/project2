import React from "react";
import axios from "axios";
import IngredientsList from "./IngredientsList";
import Filters from "./Filters";
import { checkPropTypes } from "prop-types";

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsList: [],
      filters: [],
    };
  }

  addFilter = (name) => {
    const currentFilters = [...this.state.filters];
    let updatedFilters = currentFilters;
    if (!currentFilters.includes(name)) {
      updatedFilters = [name, ...currentFilters];
    }
    this.setState({ filters: updatedFilters });
  };

  removeFilter = (name) => {
    console.log(name);
    const filters = this.state.filters.filter((filter) => filter !== name);
    this.setState({ filters });
    console.log(filters);
  };

  componentDidMount() {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=ingredient";
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((ingredientsData) => {
        this.setState({ ingredientsList: ingredientsData });
      });
  }

  render() {
    const { ingredientsList } = this.state;
    const { filters } = this.state;
    return (
      <div>
        <h1>Ingredients</h1>
        {filters.map((filter) => (
          <Filters
            name={filter}
            removeFilter={this.removeFilter}
            key={filter}
          />
        ))}
        {ingredientsList.map((ingredient) => (
          <IngredientsList
            key={ingredient.idIngredient}
            name={ingredient.strIngredient}
            addFilter={this.addFilter}
          />
        ))}
      </div>
    );
  }
}

export default Ingredient;
