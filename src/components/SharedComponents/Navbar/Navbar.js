import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../styles/logo/logo.svg';
import './Navbar.scss';
import { IoMdClose, IoIosMenu } from 'react-icons/io';



function Navbar() {

  const [navExpand, setNavExpand] = useState(false);

  const toggleNavExpand = () => {
    setNavExpand(!navExpand);
  };

  return (
    <div className={navExpand ? "navbar-expand" : "navbar"}>
      {!navExpand ? <IoIosMenu className="burger-menu" onClick={toggleNavExpand} /> : <IoMdClose className="burger-menu" onClick={toggleNavExpand} /> }
      <ul className="navbar-items">
        <li><Link to="/ingredients">Ingredients</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
