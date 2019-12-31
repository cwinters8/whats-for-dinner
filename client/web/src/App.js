import React from 'react';
import {Nav, NavLink} from 'reactstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

// components
import Main from './Components/Main';
import Recipes from './Components/Recipes';

class App extends React.Component {
  render() { 
    return (
      <div className="App">
        <header>
          <h1><a href="/">What's for Dinner?</a></h1>
          <div>
            <Nav className="nav-grid">
              <NavLink href="/mealplanner">Meal Planner</NavLink>
              <NavLink href="/recipes">Recipes</NavLink>
              <NavLink href="/grocerylist">Grocery List</NavLink>
              <NavLink href="/pantry">Pantry</NavLink>
              <NavLink href="/signup" className="sign-up">Sign Up</NavLink>
              <NavLink href="/signin">Sign In</NavLink>
            </Nav>
          </div>
        </header>
        <BrowserRouter>
          <Switch>
            {/* Default */}
            <Route exact path="/" render={() => <Main />} />
            {/* Recipes */}
            <Route path="/recipes" render={() => <Recipes />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
