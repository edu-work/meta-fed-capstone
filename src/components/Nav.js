import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const Nav = ({ isOpen, setIsOpen }) => {
  return (
    <nav className={`navigation ${isOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={() => setIsOpen(!isOpen)}><Link to="/" >Home</Link></li>
        <li onClick={() => setIsOpen(!isOpen)}><Link to="/" >About</Link></li>
        <li onClick={() => setIsOpen(!isOpen)}><Link to="/" >Menu</Link></li>
        <li onClick={() => setIsOpen(!isOpen)}><Link to="/booking" >Reservations</Link></li>
        <li onClick={() => setIsOpen(!isOpen)}><Link to="/" >Order Online</Link></li>
        <li onClick={() => setIsOpen(!isOpen)}><Link to="/" >Login</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;