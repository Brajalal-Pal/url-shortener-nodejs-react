import React from "react";
import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const mainNavigation = (props) => (
  <header className="main-navigation">
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/stats">Analytics</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default mainNavigation;
