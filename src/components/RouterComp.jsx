import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Homepage } from "../pages/Home";
import { Profile } from "../pages/Profile";

const NavLink = ({ to, label }) => <Link to={to}>{label} </Link>;

export const RouterComp = ({ links }) => (
  <Router>
    <nav>
      <ul>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} label={link.label} />
        ))}
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);
