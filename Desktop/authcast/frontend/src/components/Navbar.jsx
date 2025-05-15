
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <span className="logo-icon">✓</span>
          <h1>TaskDragger</h1>
        </div>
        <div className="nav-menu">
          <div className="nav-item">My Tasks</div>
          <div className="nav-item active">Dashboard</div>
        </div>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;