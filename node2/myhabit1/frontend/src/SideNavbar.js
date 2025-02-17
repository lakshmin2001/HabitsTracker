import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar = ({ onMonthClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleMonthClick = (month) => {
    const monthLowerCase = month.toLowerCase();
    navigate(`/${monthLowerCase}`);
    setIsOpen(false);
    if (onMonthClick) {
      onMonthClick(monthLowerCase); // Notify the parent component
    }
  };

  return (
    <div className="side-navbar-container">
      <div className="menu-icon" onClick={toggleNavbar}>
        ☰
      </div>

      {isOpen && (
        <div className="side-navbar">
          <button className="close-btn" onClick={toggleNavbar}>X</button>
          <ul>
            {months.map((month, index) => (
              <li key={index} onClick={() => handleMonthClick(month)}>
                {month}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideNavbar;