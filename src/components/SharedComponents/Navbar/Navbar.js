import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../styles/logo/logo.svg';
import './Navbar.scss';
import { IoMdClose, IoIosMenu } from 'react-icons/io';



function Navbar() {

  const [navExpand, setNavExpand] = useState(false);

  const handleNavExpand = (operator) => {
    if (operator === 'open') {
      setNavExpand(true);
    } else {
      setNavExpand(false);
    }
  };

  return (
    <div className={navExpand ? "navbar-expand" : "navbar"}>
      {!navExpand ? <IoIosMenu className="burger-menu" onClick={() => handleNavExpand('open')} /> : <IoMdClose className="close-menu" onClick={() => handleNavExpand('close')} /> }
      <ul className="navbar-items">
        <li onClick={() => handleNavExpand('close')}><Link to="/ingredients">Ingredients</Link></li>
        <li onClick={() => handleNavExpand('close')}><Link to="/recipes">Recipes</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
