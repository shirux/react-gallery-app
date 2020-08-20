import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="main-nav">
            <ul>
                <li><NavLink to='/bicycles'>Bicycles</NavLink></li>
                <li><NavLink to='/forest'>Forest</NavLink></li>
                <li><NavLink to='/landscapes'>Landscapes</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;