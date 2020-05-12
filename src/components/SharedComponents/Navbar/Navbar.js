import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../styles/logo/logo.svg';
import './Navbar.scss';


function Navbar() {
  return (
    <div className="navbar">
      <Link to="/"><Logo className="navbar-logo" /></Link>
      <ul className="navbar-items">
        <li><Link to="/ingredients" className="navbar-link">Ingredients</Link></li>
        <li><Link to="/recipes" className="navbar-link">Recipes</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
