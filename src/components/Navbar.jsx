import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../redux/feature/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="navbar-nav flex-sm-row" id="navbarNav">
          <ul className="navbar-nav flex-row gap-4 ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/head-tail">
                Head & Tail
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
