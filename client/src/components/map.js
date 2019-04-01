import '../assets/css/map.css';
import React, { Component } from 'react';
import apiKey from '../config/api_key';
import GoogleMapReact from 'google-map-react';
import { getSearchResult } from '../actions';
import { connect } from 'react-redux';
import wfmIcon from '../assets/image/whole_food_market_icon.png';
import keyPlaceIcon from '../assets/image/key_place_icon.png';
import targetIcon from '../assets/image/target_icon.png';
import traderJoeIcon from '../assets/image/trader_joe_icon.png';
import starbucksIcon from '../assets/image/starbucks_icon.png';
import crossFitIcon from '../assets/image/crossfit_icon.png';
// import { MapsLocalDining } from 'material-ui/svg-icons';
// import localDining from 'material-ui/svg-icons/maps/local-dining';

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
        bounds.extend(new maps.LatLng(
            place.geometry__location__lat,
            place.geometry__location__lng,
        ));
    });
    return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        });
    });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
};

const Marker = ({ name }) => {
    return <div className="marker"><img src={
        function () {
            if (name.includes("Whole Food")) {
                return wfmIcon;
            } else if (name.includes("Target")) {
                return targetIcon;
            } else if (name.includes("Starbucks")) {
                return starbucksIcon;
            } else if (name.includes("Trader Joe")) {
                return traderJoeIcon;
            } else if (name.includes("CrossFit") || name.includes("Crossfit")) {
                return crossFitIcon;
            }
            return keyPlaceIcon;
        }()
    } alt="" /></div>
};

class Map extends Component {
    // static defaultProps = {
    //     // center: {
    //     //     lat: 59.95,
    //     //     lng: 30.33
    //     // },
    //     zoom: 11
    // };

    renderMarker() {
        const { places } = this.props.locationList.payload;
        return places.map((place) => {
            return <Marker
                key={place.id}
                lat={place.geometry__location__lat}
                lng={place.geometry__location__lng}
                name={place.name}
            />
        })
    }

    render() {
        const { locationList } = this.props;
        console.log("locationList:", locationList);
        if (locationList) {
            const { mapCenter, places } = locationList.payload;
            return (
                <div className="map-container">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: apiKey.GOOGLE_PLACES_API_KEY }}
                        // defaultCenter={mapCenter}
                        center={mapCenter}
                        defaultZoom={11}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
                    >
                        {this.renderMarker()}
                    </GoogleMapReact>
                </div>
            );
        }
        return <h1 className="center map-loading-text">Loading...</h1>
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