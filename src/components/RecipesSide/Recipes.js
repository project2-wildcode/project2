import React from 'react';
import SearchBar from '../SharedComponents/SearchBar';
import axios from 'axios';
import RecipesList from '../SharedComponents/RecipesList';

const Arrrating = [ 1, 2, 3, 4, 5 ];
const Arrtime = [ 30, 45, 60, 90 ];
const Arrlevel = [ 'Easy', 'Medium', 'Hard' ];
const Arrpeople = [ 1, 2, 3, 4 ];

function randomNum(num) {
	return Math.floor(Math.random() * num);
}

class Recipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipesAPI: '',
			searchInputRecipes: '',
			recipesData: []
		};
	}

	handleChangeRecipes = (event) => {
		const value = event.target.value;
		const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
		if (value.length > 0) {
			axios.get(url).then((response) => response.data.meals).then((recipesData) => {
				if (recipesData === null) {
					this.setState({ recipesData: [], searchInputRecipes: value });
				} else {
					const updatedRecipesList = recipesData.map((recipe) => {
						const extraInfo = {
							rating: Arrrating[randomNum(5)],
							time: Arrtime[randomNum(4)],
							level: Arrlevel[randomNum(3)],
							people: Arrpeople[randomNum(4)]
						};
						return { ...recipe, ...extraInfo };
					});
					this.setState({ recipesData: updatedRecipesList, searchInputRecipes: value });
				}
			});
		}
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
					{this.state.recipesData.length === 0 ? (
						<div>No recipes found</div>
					) : (
						this.state.recipesData.map((recipeData) => (
							<RecipesList
								name={recipeData.strMeal}
								pic={recipeData.strMealThumb}
								rating={recipeData.rating}
								time={recipeData.time}
								level={recipeData.level}
								people={recipeData.people}
							/>
						))
					)}
				</div>
				{/* <div>
					{this.state.recipesData !== [] ? (
						this.state.recipesData.map((recipeData) => (
							<RecipesList
								name={recipeData.strMeal}
								pic={recipeData.strMealThumb}
								rating={recipeData.rating}
								time={recipeData.time}
								level={recipeData.level}
								people={recipeData.people}
							/>
						))
					) : (
						<div>No recipes found</div>
					)}
				</div> */}
			</div>
		);
	}
}

export default Recipes;
