import React from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';
import Filters from './Filters';
import SearchBar from './SearchBar';
import RecipesList from './RecipesList';
import NumRecipes from './NumRecipes';
import { checkPropTypes } from 'prop-types';

class Ingredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allIngredients: [],
			ingredientsList: [],
			searchInputValue: '',
			filters: [],
			recipesList: [],
			showRecipes: false,
			allRecipes: [],
			recipesList: []
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
		this.addRecipes(updatedFilters);
	};

	addRecipes = (filters) => {
		let searchValue = null;

		if (filters.length === 1) {
			searchValue = filters[0].split(' ').join('_');
		}

		if (filters.length > 1) {
			searchValue = filters.map((filter) => filter.split(' ').join('_')).join(',');
		}

		let url = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${searchValue}`;

		axios.get(url).then((response) => response.data.meals).then((recipesListData) => {
			this.setState({ recipesList: recipesListData });
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
			return ingredient.strIngredient.toLowerCase().includes(value.toLowerCase());
		});
		console.log(filteredIngredients);

		this.setState({
			searchInputValue: value,
			ingredientsList: filteredIngredients
		});
	};

	handleClickShowRecipes = () => {
		this.setState((prevState) => {
			return { showRecipes: !prevState.showRecipes };
		});
	};

	render() {
		const { ingredientsList, filters, searchInputValue, recipesList } = this.state;

		return (
			<div className="ingredients-container">
				<h1>Ingredients</h1>
				<SearchBar
					input={searchInputValue}
					handleChange={this.handleChange}
					addRecipes={this.addRecipes}
					placeholder={'ingredients'}
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
							<RecipesList showRecipes={this.state.showRecipes} name={recipe.strMeal} />
						))}
				</div>
				<div className="filters-container">
					{filters.map((filter) => <Filters name={filter} removeFilter={this.removeFilter} key={filter} />)}
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
