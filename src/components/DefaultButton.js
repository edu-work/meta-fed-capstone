import React from 'react';
import '../App.css';


const DefaultButton = ({ children, ...props }) => {
  return (
    <button {...props} className="button button-content">
      {children}
    </button>
  );
};

export default DefaultButton;