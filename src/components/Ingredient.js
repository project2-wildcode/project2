import React from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';
import Filters from './Filters';
import SearchBar from './SearchBar';
import NumRecipes from './NumRecipes';
import DisplayRecipes from './DisplayRecipes';

class Ingredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allIngredients: [],
			ingredientsList: [],
			searchInputValue: '',
			filters: [],
			filteredRecipes: []
		};
	}

	componentDidMount() {
		const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=ingredient';
		axios.get(url).then((response) => response.data.meals).then((ingredientsData) => {
			this.setState({
				ingredientsList: ingredientsData,
				allIngredients: ingredientsData
			});
		});
	}

	addFilter = (name) => {
		const { filters } = this.state;
		const currentFilters = [ ...filters ];
		let updatedFilters = currentFilters;
		if (!currentFilters.includes(name)) {
			updatedFilters = [ name, ...currentFilters ];
		}
		this.setState({ filters: updatedFilters });
		this.handleFilterRecipes(updatedFilters);
	};

	removeFilter = (name) => {
		const { filters } = this.state;
		const newFilters = filters.filter((filter) => filter !== name);
		this.setState({ filters: newFilters });
		this.handleFilterRecipes(newFilters);
	};

	handleChange = (event) => {
		const { value } = event.target;
		const { allIngredients } = this.state;
		const filteredIngredients = allIngredients.filter((ingredient) => {
			return ingredient.strIngredient.toLowerCase().includes(value.toLowerCase());
		});
		this.setState({
			searchInputValue: value,
			ingredientsList: filteredIngredients
		});
	};

	handleFilterRecipes = (filters) => {
		let filterArray = filters;
		let filterString = filterArray.join(',');
		let url = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${filterString}`;

		axios.get(url).then((response) => response.data.meals).then((recipeData) => {
			this.setState({ filteredRecipes: recipeData });
			console.log(this.state.filteredRecipes);
		});
	};

	render() {
		const { ingredientsList, filters, searchInputValue, filteredRecipes } = this.state;
		return (
			<div className="ingredients-container">
				<h1>Ingredients</h1>
				<SearchBar input={searchInputValue} handleChange={this.handleChange} />
				<div className="filters-container">
					{filters.map((filter) => <Filters name={filter} removeFilter={this.removeFilter} key={filter} />)}
				</div>

				<div>
					{filteredRecipes.map((filteredRecipe) => {
						return <DisplayRecipes name={filteredRecipe.strMeal} />;
					})}
				</div>

				<NumRecipes />

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
