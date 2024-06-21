import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Add from "./components/Restaurant/profile/Admin/pages/Add/Add";
import Profile from "./components/Auth/Profile/Profile";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import JoinUS from "./components/JoinUS/JoinUS";
import JoinUS1st from "./components/JoinUS/JoinUS1st";
import RestaurantLogin from "./components/Restaurant/login/RestaurantLogin";
import RestaurantProfile from "./components/Restaurant/profile/RestaurantProfile";

const App = () => {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurant/register" element={<JoinUS1st />} />
          <Route path="/restaurant/register/joinus" element={<JoinUS />} />
          <Route path="/restaurant/login" element={<RestaurantLogin />} />
          <Route path="/restaurant/profile" element={<RestaurantProfile />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
