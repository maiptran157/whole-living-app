import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/nav_bar';
import Footer from './components/footer';
import SearchResult from './components/search_result';
import AboutUs from './components/about_us';
import NotFound from './components/not_found';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app-container" >
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path={`/find`} component={SearchResult} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
