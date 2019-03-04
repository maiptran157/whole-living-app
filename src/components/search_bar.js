import M from 'materialize-css';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { submitSearch } from '../actions';
import { connect } from 'react-redux';
import { renderInput } from '../helpers';

class SearchBar extends Component {
    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }

    submitFormHandler = (data) => {
        this.props.submitSearch(data).then(() => {
            console.log("submitFormHandler result:", this.props.locationList.search.locationList)
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return (<div className="row">
            <form className="col s8 offset-s2 form-style" action="" onSubmit={handleSubmit(this.submitFormHandler)}>
                <Field name="region" id="region" component={renderInput} label="Region" />
                <Field name="keyPlace" id="keyPlace" component={renderInput} label="Key place" />
                <div className="row">
                    <div className="s12 right-align">
                        <button className="btn #4db6ac teal lighten-2">Submit</button>
                    </div>
                </div>
            </form>
        </div>)
    }
}

function validate(data) {
    const { region, keyPlace } = data;
    const errors = {};

    if (!region) {
        errors.region = 'Please fill out the region you want to live in.';
    }

    if (!keyPlace) {
        errors.keyPlace = 'Please fill out the key place you want to live by.';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        locationList: state
    }
}

SearchBar = connect(mapStateToProps, {
    submitSearch: submitSearch
})(SearchBar);

export default reduxForm({
    form: 'submit-search',
    validate: validate
})(SearchBar);