import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">Inventarios</NavLink>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <NavLink className="nav-link" to="/media">Media</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/director">Director</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/genero">Género</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/productora">Productora</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/tipo">Tipo</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};