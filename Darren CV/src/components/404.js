import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./404.css";

const PageNotFound = () => {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <NavLink to="/" href="#">
          HOMEPAGE
        </NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;
