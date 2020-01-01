import React from 'react';

class Recipe extends React.Component {
  state = {
    recipe: {
      ingredients: []
    }
  }

  getRecipe = () => {
    this.props.runFetch(`/recipes/${this.props.recipeId}`, (data, statusCode) => {
      if (statusCode === 200) {
        this.setState({recipe: data});
      }
    });
  }

  renderRecipe = recipe => {
    const recipeElements = [];
    if (Object.entries(recipe).length > 0) {
      if (recipe.image) {
        recipeElements.push(<img className="recipeImage" src={recipe.image} alt={recipe.name} />);
      }
      recipeElements.push(
        
      )
      return recipeElements;
    }
  }

  componentDidMount() {
    this.getRecipe();
  }

  render() {
    return (
      <div className="recipe-container">
        <img className="recipe-image" src={this.state.recipe.image || "https://via.placeholder.com/300.png?text=What's+for+Dinner%3F"} alt={this.state.recipe.name} />
        <div>
          <h2>{this.state.recipe.name}</h2>
          <p>Minutes required: {this.state.recipe.timeInMinutes}</p>
          <p>{this.state.recipe.description}</p>
          <h3>Ingredients:</h3>
          <ul>{this.state.recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
          <h3>Directions:</h3>
          <p>{this.state.recipe.directions}</p>
        </div>
      </div>
    )
  }
}

export default Recipe;