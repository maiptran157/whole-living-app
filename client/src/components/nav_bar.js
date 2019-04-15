import '../assets/css/nav_bar.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import wholeLivingIcon from '../assets/image/whole_living_icon.png';

export default class Navbar extends Component {
    render() {
        return <nav className="#4db6ac teal lighten-2">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo center"> <img src={wholeLivingIcon} alt="" />
                    Whole Living</Link>
            </div>
        </nav>
    }
}