import '../assets/css/map.css';
import React, { Component } from 'react';
import apiKey from '../config/api_key';
import GoogleMapReact from 'google-map-react';
import { getSearchResult } from '../actions';
import { connect } from 'react-redux';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        console.log("Map props:", this.props);
        return (
            <div className="map-container">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey.GOOGLE_PLACES_API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text={'Kreyser Avrora'}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locationList: state.search.locationList
    }
}

export default Map = connect(mapStateToProps, {
    getSearchResult: getSearchResult
})(Map);