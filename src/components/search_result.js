import React, { Component } from 'react';
import Map from './map';

export default class SearchResult extends Component {
    render() {
        console.log(this.props)
        return <div className="">
            <Map />
        </div>
    }
}