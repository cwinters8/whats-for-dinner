import React from 'react';

class Recipes extends React.Component {
  state = {
    recipes: []
  }

  getRecipes = () => {
    this.props.runFetch('/recipes', (data, statusCode) => {
      if (statusCode === 200) {
        this.setState({recipes: data});
      }
    });
  }

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    return (
      <div>
        <ul>{this.state.recipes.map(recipe => <li key={recipe._id}><a href={`/recipes/${recipe._id}`}>{recipe.name}</a></li>)}</ul>
      </div>
    )
  }
}

export default Recipes;