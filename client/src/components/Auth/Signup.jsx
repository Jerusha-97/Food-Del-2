import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import NavbarDouble from "../navbar/NavbarDouble";

const Signup = () => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSignup = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/api/user/register`, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <>
      <NavbarDouble />
      <div className="auth-page">
        <form onSubmit={onSignup} className="auth-container">
          <div className="auth-title">
            <h2>Sign Up</h2>
          </div>
          <div className="auth-inputs">
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="log">
            Create Account
          </button>
          <div className="auth-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="custom-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
