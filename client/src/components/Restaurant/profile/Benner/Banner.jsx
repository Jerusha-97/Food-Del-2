import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Benner.css';

const RestaurantBanner = ({ profileData }) => {
  // Here you can access profileData and render it as needed
  return (
    <div className="banner">
      {profileData.length > 0 ? (
        <div>
          {profileData.map((restaurant, index) => (
            <div key={index}>
              <img src={restaurant.restaurantImage} alt="hi hello"/>
              <h3 className="res-name">Welcome, {restaurant.restaurantName}</h3>
              <center><h4 className="desc">{restaurant.description}</h4></center>
              <p className="address">
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#333' }} /> Address: {restaurant.address}
              </p>
              <div className="right">
                <p className="email">
                  <FontAwesomeIcon icon={faEnvelope} style={{ color: '#666' }} /> {restaurant.email}
                </p>
                <p className="contact">
                  <FontAwesomeIcon icon={faMobileAlt} style={{ color: '#999' }} /> +91{restaurant.contact}
                </p>
              </div>
              {/* Render other profile data as needed */}
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RestaurantBanner;
