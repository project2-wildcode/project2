import React from 'react';
import HomeOpening from './HomeSubcomponents/HomeOpening';
import HomeIngredients from './HomeSubcomponents/HomeIngredients';
import HomeRecipes from './HomeSubcomponents/HomeRecipes';
import './Home.scss';

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-page-wrapper">
        <HomeOpening />
        <HomeIngredients />
        <HomeRecipes />
      </div>
    </div>
  );
}

export default Home;
