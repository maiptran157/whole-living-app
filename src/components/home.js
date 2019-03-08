import '../assets/css/home.css';
import React, { Component } from 'react';
import SearchBar from './search_bar';

export default class Home extends Component {
    render() {
        return <div className="container">
            <div className="home-container">
                <SearchBar history={this.props.history} />
            </div>
        </div>
    }
}