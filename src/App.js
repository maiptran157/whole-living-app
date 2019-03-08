// import image1 from './assets/image/whole_living_background_1.jpeg';
import image2 from './assets/image/whole_living_background_2.jpeg';
// import image3 from './assets/image/whole_living_background_3.jpeg';
// import image4 from './assets/image/whole_living_background_4.jpeg';
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
      },
      // currentImg: image2,
    }
    // this.shuffleImage = this.shuffleImage.bind(this);
  }

  // shuffleImage() {
  //   var imageArr = [image1, image2, image3, image4];
  //   var nextIndex = imageArr.indexOf(this.state.currentImg) + 1;
  //   if (nextIndex === imageArr.length) {
  //     nextIndex = 0;
  //   }
  //   this.setState({
  //     backgroundImg: {
  //       backgroundImage: `url(${imageArr[nextIndex]})`
  //     },
  //     currentImg: imageArr[nextIndex],
  //   })
  // }

  // componentDidMount() {
  //   setTimeout(this.shuffleImage(), 700)
  // }

  render() {
    return (
      <div className="app-container" style={this.state.backgroundImg} >
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/result/:queryString" component={SearchResult} />
          <Route component={NotFound} />
        </Switch>

      </div>
    );
  }
}

export default App;
