import M from 'materialize-css';
// import $ from 'jquery';
import image1 from './assets/image/whole_living_background_1.jpeg';
import image2 from './assets/image/whole_living_background_2.jpeg';
import image3 from './assets/image/whole_living_background_3.jpeg';
import image4 from './assets/image/whole_living_background_4.jpeg';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/nav_bar';
import SearchResult from './components/search_result';
import NotFound from './components/not_found';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImg: {
        backgroundImage: `url(${image2})`
      }
    }
    this.getActiveSlide = this.getActiveSlide.bind(this);
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      let elems = document.querySelectorAll('.carousel');
      M.Carousel.init(elems, { fullWidth: true });
    });
    this.getActiveSlide();

  }

  getActiveSlide() {
    const activeSlide = document.getElementsByClassName('active');
    console.log(activeSlide);
  }

  render() {
    return (
      <div className="app-container" >
        <div className="carousel carousel-slider background-image">
          <a className="carousel-item" href="#image1!"><img alt="" src={image1} /></a>
          <a className="carousel-item" href="#image2!"><img alt="" src={image2} /></a>
          <a className="carousel-item" href="#image3!"><img alt="" src={image3} /></a>
          <a className="carousel-item" href="#image4!"><img alt="" src={image4} /></a>
        </div>
        <div className="page">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/result/:queryString" component={SearchResult} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
