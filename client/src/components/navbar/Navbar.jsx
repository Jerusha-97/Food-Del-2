import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets"; // Ensure the assets path is correct
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { totalItemCount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-profile">
          <Link to="#">JoinUS</Link>
          <ul className="nav-profile-dropdown">
            <li>
              <img src={assets.parcel_icon} alt="" />
              <Link to="/restaurant/register">Register Restaurant</Link>
            </li>
            <hr />
            <li>
              <img src={assets.parcel_icon} alt="" />
              <Link to="/restaurant/login">Login Restaurant</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
            {totalItemCount > 0 && <div className="dot">{totalItemCount}</div>}
          </Link>
        </div>
        <div className="navbar-profile">
          {token ? (
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="profile-icon"
            />
          ) : (
            <Link to="#">User</Link>
          )}
          <ul className="nav-profile-dropdown">
            {!token ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <hr />
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <img src={assets.profile_icon} alt="Profile" />
                  <Link to="/profile">Profile</Link>
                </li>
                <hr />
                <li>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
