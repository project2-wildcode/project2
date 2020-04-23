import React from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';
import Filters from './Filters';
import SearchBar from './SearchBar';


class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allIngredients: [],
      ingredientsList: [],
      searchInputValue: '',
      filters: [],
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
  };

  removeFilter = (name) => {
    const { filters } = this.state;
    const newFilters = filters.filter((filter) => filter !== name);
    this.setState({ filters: newFilters });
  };

  handleChange = (event) => {
    const { value } = event.target;
    const { allIngredients } = this.state;
    const filteredIngredients = allIngredients.filter((ingredient) => {
      return ingredient.strIngredient.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({
      searchInputValue: value,
      ingredientsList: filteredIngredients,
    });
  }


  render() {
    const { ingredientsList, filters, searchInputValue } = this.state;
    return (
      <div className="ingredients-container">
        <SearchBar
          input={this.state.searchInputValue}
          inputChangeHandler={this.handleChange}
          inputHandleSubmit={this.handleSubmit}
        />

        <h1>Ingredients</h1>
        <SearchBar
          input={searchInputValue}
          handleChange={this.handleChange}
        />
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
