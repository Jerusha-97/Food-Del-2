import React, { useState, useEffect } from "react";
import Benner from './Benner/Banner'
import ExploreMenu from "../../ExploreMenu/ExploreMenu";
import Admin from "./Admin/Admin";

const RestaurantProfile = () => {
  const loggedInRestaurantName = localStorage.getItem("loggedInRestaurantName");
  const [profileData, setProfileData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (loggedInRestaurantName) {
      fetchRestaurantProfile();
    }
  }, [loggedInRestaurantName]);
 

  const fetchRestaurantProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/restaurants/profile?restaurantName=${loggedInRestaurantName}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch restaurant profile");
      }

      setProfileData(data);
    } catch (error) {
      console.error("Error fetching restaurant profile:", error);
      setErrorMessage(error.message || "Failed to fetch restaurant profile. Please try again.");
    }
  };
  // console.log("details:::",profileData)

  const [category,setCategory]= useState("all")

  return (
    <div className="profile">
      <h2>Restaurant Profile</h2>
      {errorMessage && <div>Error: {errorMessage}</div>}
      <Benner profileData={profileData} />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <Admin/>
      
      {/* Render other profile data if needed */}
    </div>
  );
};

export default RestaurantProfile;
