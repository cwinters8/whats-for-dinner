import React from 'react';
import {Nav, NavLink} from 'reactstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

// components
import Main from './Components/Main';
import Recipes from './Components/Recipes';

const api = 'http://localhost:5000/api';

class App extends React.Component {
  // helper function for retrieving data
  runFetch = (path, callback, method="GET", headers={}, body) => {
    // set Content-Type header if a body is being passed in
    if (body) {
      headers['Content-Type'] = 'application/json';
    }
    fetch(`${api}/${path}`, {
      method: method, 
      headers: new Headers(headers), 
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 500) {
        window.location.href = '/error';
      }
      response.json().then(data => {
        callback(data, response.status);
      });
    });
  }

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
            <Route path="/recipes" render={() => <Recipes runFetch={this.runFetch} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
