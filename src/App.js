import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Recipes from './components/RecipesSide/Recipes';
import Ingredient from './components/IngredientsSide/Ingredient';
import Home from './components/Home/Home';
import Navbar from './components/SharedComponents/Navbar/Navbar';
import Recipe from './components/RecipePage/Recipe';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ingredients" component={Ingredient} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/recipe" component={Recipe} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
