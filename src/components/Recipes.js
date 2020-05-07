import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import RecipesList from './RecipesList';

class Recipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipesAPI: '',
			searchInputRecipes: '',
			recipesFound: []
		};
	}

	handleChangeRecipes = (event) => {
		const value = event.target.value;
		const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
		axios.get(url).then((response) => response.data.meals).then((recipesData) => {
			this.setState({
				recipesFound: recipesData,
				searchInputRecipes: value
			});
		});
	};

	render() {
		return (
			<div>
				<div>
					<SearchBar
						input={this.state.searchInputRecipes}
						handleChange={this.handleChangeRecipes}
						placeholder={'recipes'}
					/>
				</div>
				<div>
					{this.state.recipesFound !== null ? (
						this.state.recipesFound.map((recipeData) => (
							<RecipesList
								recipesFoundName={recipeData.strMeal}
								recipesFoundPic={recipeData.strMealThumb}
							/>
						))
					) : (
						'No recipes found'
					)}
				</div>
			</div>
		);
	}
}

export default Recipes;
