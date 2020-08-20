import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    /**
     * Renders three different NavLink options
     */
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