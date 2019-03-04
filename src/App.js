import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/nav_bar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Route exact to="/" component={Home} />
        </div>
      </div>
    );
  }
}

export default App;
