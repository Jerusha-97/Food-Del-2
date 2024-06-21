import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurantLogin.css";
import { StoreContext } from "../../../context/StoreContext";

const RestaurantLogin = () => {
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    restaurantName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState(null); // State to hold login data
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/restaurants/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setLoginData(data.restaurant); // Store the retrieved login data
        localStorage.setItem("restaurantToken", data.token);
        localStorage.setItem("loggedInRestaurantName", formData.restaurantName); // Save the restaurant name to localStorage
        console.log("Logged in restaurant name:", formData.restaurantName); // Log the loggedInRestaurantName
        navigate("/restaurant/profile");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage("Error during login. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <h2>Restaurant Login</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loginData && ( // Render login data if available
        <div>
          <h3>Login Data:</h3>
          <pre>{JSON.stringify(loginData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RestaurantLogin;
