import React, { Component } from 'react';
import SearchBar from './search_bar';

export default class Home extends Component {
    render() {
        return <div>
            <h1 className="center">Home</h1>
            <SearchBar />
        </div>
    }
}