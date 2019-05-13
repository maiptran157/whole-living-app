import M from 'materialize-css';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from '../helpers';
import Script from 'react-load-script';
import apiKey from '../config/api_key';

class SearchBar extends Component {
    // Define Constructor
    constructor(props) {
        super(props);
        // Declare State
        this.state = {
            city: '',
            query: ''
        };
        // Bind Functions
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

    }

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }

    submitFormHandler = (data) => {
        this.props.history.push(`/find?address=${data.address}&keyPlace=${data.keyPlace}`);
    }

    handleScriptLoad() {
        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = null;
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('address')
        );
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }

    handlePlaceSelect() {
        // Extract City From Address Object
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
        // Check if address is valid
        if (address) {
            // Set State
            this.setState({
                city: address[0].long_name,
                query: addressObject.formatted_address,
            });
        }
    }

    componentWillUnmount() {
        // window.google = {};
        this.setState({
            city: '',
            query: ''
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return (<div className="row search-bar-container">
            <form className="col s8 offset-s2 form-style" action="" onSubmit={handleSubmit(this.submitFormHandler)}>
                <Field name="address" id="address" component={renderInput} label="Address" />
                <Script url={`https://maps.googleapis.com/maps/api/js?key=${apiKey.GOOGLE_PLACES_API_KEY}&libraries=places`} onLoad={this.handleScriptLoad} />
                <Field name="keyPlace" id="keyPlace" component={renderInput} label="Key place" />
                <div className="row">
                    <div className="s12 right-align">
                        <button className="btn #4db6ac teal lighten-2">Find your neighborhood</button>
                    </div>
                </div>
            </form>
        </div>)
    }
}

function validate(data) {
    const { address, keyPlace } = data;
    const errors = {};

    if (!address) {
        errors.address = 'Please fill out the region you want to live in.';
    }

    if (!keyPlace) {
        errors.keyPlace = 'Please fill out the place/store you want to live by.';
    }

    return errors;
}

export default reduxForm({
    form: 'submit-search',
    validate: validate
})(SearchBar);