import React from 'react';


const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  return (
    <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
      <img src={require('../images/hamburger-menu.png')} alt="Hamburger Menu" />
    </button>
  );
};

export default HamburgerMenu;