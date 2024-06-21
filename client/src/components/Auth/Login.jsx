import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import NavbarDouble from "../navbar/NavbarDouble";

const Login = () => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/api/user/login`, data);

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
      <div className="auth-page ">
        <form onSubmit={onLogin} className="auth-container">
          <div className="auth-title">
            <h2>Login</h2>
          </div>
          <div className="auth-inputs">
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
            Login
          </button>
          <div className="auth-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="custom-link">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
