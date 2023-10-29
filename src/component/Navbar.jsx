// import React from 'react'
import "./Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="faizy1">
      <div className="faizy_2">
        <li className="nav-item">
          <NavLink to="/currentWeather" className="nav-links">
            Your Weather
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/searchWeather"
            className="nav-links"
          >
            Search Weather
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
