import React, { useState, useEffect } from 'react';
import '../App.css';
import Nav from "./Nav";
import HamburgerMenu from "./HamburgerMenu";


const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo" src={require('../images/little-lemon-logo.png')} alt="Little Lemon logo" />
    </div>
  )
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest('.hamburger') && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className={"header"}>
      <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <Logo />
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};


export default Header;