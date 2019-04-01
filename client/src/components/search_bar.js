import M from 'materialize-css';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from '../helpers';

class SearchBar extends Component {
    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }

    submitFormHandler = (data) => {
        this.props.history.push(`/find?address=${data.address}&keyPlace=${data.keyPlace}`)
    }

    render() {
        const { handleSubmit } = this.props;
        return (<div className="row search-bar-container">
            <form className="col s8 offset-s2 form-style" action="" onSubmit={handleSubmit(this.submitFormHandler)}>
                <Field name="address" id="address" component={renderInput} label="Address" placeholder="I want to live at..." />
                <Field name="keyPlace" id="keyPlace" component={renderInput} label="Key place" placeholder="I want to live near..." />
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
        errors.keyPlace = 'Please fill out the key place you want to live by.';
    }

    return errors;
}

export default reduxForm({
    form: 'submit-search',
    validate: validate
})(SearchBar);