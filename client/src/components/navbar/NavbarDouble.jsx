// src/NavbarDouble.js
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets"; // Ensure the assets path is correct
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import FAQs from "../FAQs/FAQs";

const NavbarDouble = () => {
  const [menu, setMenu] = useState("home");
  const { totalItemCount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="navbar navbar-double">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>
        <h3 onClick={() => setIsModalVisible(true)} className="nav-faqs">
          FAQs
        </h3>
      </div>
      <FAQs
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default NavbarDouble;
