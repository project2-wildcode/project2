import React from 'react';
import HomeOpening from './Homesubcomponents/HomeOpening';
import HomeIngredients from './Homesubcomponents/HomeIngredients';
import HomeRecipes from './Homesubcomponents/HomeRecipes';

function Home() {
  
  
    return(
      <div className='home-wrapper'>
        <div className='page-wrapper'>
            <HomeOpening />
            <HomeIngredients />
            <HomeRecipes />
      </div>
      </div>
      
    )
}

export default Home;
