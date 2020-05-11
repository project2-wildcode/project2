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
			recipesFound: []
		};
	}

	handleChangeRecipes = (event) => {
		const value = event.target.value;
		const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
		axios.get(url).then((response) => response.data.meals).then((recipesData) => {
			const updatedRecipeList = recipesData.map((recipe) => {
				const extraInfo = {
					rating: Arrrating[randomNum(5)],
					time: Arrtime[randomNum(4)],
					level: Arrlevel[randomNum(3)],
					people: Arrpeople[randomNum(4)]
				};
				return { ...recipe, ...extraInfo };
			});
			this.setState({ recipesFound: updatedRecipeList, searchInputRecipes: value });
		});
	};

	render() {
		console.log(this.state.recipesFound);
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
						this.state.recipesFound.map((recipeFound) => (
							<RecipesList
								name={recipeFound.strMeal}
								pic={recipeFound.strMealThumb}
								rating={recipeFound.rating}
								time={recipeFound.time}
								level={recipeFound.level}
								people={recipeFound.people}
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
