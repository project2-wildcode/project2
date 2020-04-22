import React from 'react';
import axios from 'axios';
import IngredientsList from './IngredientsList';
import SearchBar from'./SearchBar'

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      ingredientsList: [],
      searchInputValue: '',
      allIngredients: []
    };
  }

  componentDidMount() {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=ingredient';
    axios
      .get(url)
      .then((response) => response.data.meals)
      .then((ingredientsData) => {
        this.setState({ ingredientsList: ingredientsData, allIngredients: ingredientsData });
      });
  }
 handleChange=(event)=>{
   this.setState({searchInputValue:event.target.value})
 }

 handleSubmit=()=>{
   let inputValue=this.state.searchInputValue
 let ingredientsListVariable= this.state.allIngredients
 let findIngredients = ingredientsListVariable.filter(ingredient=> {
   return ingredient.strIngredient.toLowerCase().includes(inputValue.toLowerCase())})
   this.setState({ingredientsList:findIngredients})
   console.log('submit');
 }
  /*{let searchInputValueVariable = this.state.searchInputValue
  let ingredientsListVariable =this.state.ingredientsList.strDescription 
  
ingredientsListvariable.map(ingredient=>(
ingredient.includes(searchInputValueVariable)
this.state({ingredientsSearchResult:searchInputValueVariable})


))

  if (ingredientsListVariable.includes(searchInputValueVariable)){
    this.setState({ingredientsSearchResult:ingredientsListVariable})
  }
}*/

  render() {
    const { ingredientsList } = this.state;
    return (
      <div>
        <SearchBar 
        input={this.state.searchInputValue}
        inputChangeHandler={this.handleChange}
        inputHandleSubmit={this.handleSubmit}
        />

        <h1>Ingredients</h1>
        {ingredientsList.map((ingredient) => (
          <IngredientsList
            key={ingredient.idIngredient}
            name={ingredient.strIngredient}
          />
        ))}

      </div>
    );
  }
}


export default Ingredient;
