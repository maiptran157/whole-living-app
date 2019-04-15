import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return <footer className="page-footer #00796b teal darken-2">
            <div className="container">
                © 2019 Whole Living
                <Link className="grey-text text-lighten-4 right" to="/about-us">About Us</Link>
            </div>
        </footer>
    }
}
