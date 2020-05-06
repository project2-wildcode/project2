import React, { Component } from 'react';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeInfo:[]
        }
    }


    render(){
        console.log(this.props.location.state.recipeName)
        return(
            <div>recipe</div>
        )
    }
}

export default Recipe;

