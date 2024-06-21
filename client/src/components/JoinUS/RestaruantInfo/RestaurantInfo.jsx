import React, { useState } from "react";

const RestaurantInfo = () => (
  <div>
    <div className="row">
      <BasicDetails />
      <OwnerContactDetails />
    </div>
    <div className="row">
      <WorkingDays />
      <OpeningClosingTime />
    </div>
  </div>
);

const BasicDetails = () => (
  <div className="res-details">
    <h3>Basic Details</h3>
    <input
      type="text"
      name="restaurantName"
      className="input-box"
      placeholder="Restaurant Name"
    />

    <input
      type="text"
      name="address"
      className="input-box"
      placeholder="Address"
    />

    <input
      type="text"
      name="location"
      className="input-box"
      placeholder="Location"
    />
  </div>
);

const OwnerContactDetails = () => (
  <div className="res-details">
    <h3>Owner Contact Details</h3>
    <input
      type="text"
      name="ownerName"
      className="input-box"
      placeholder="Owner Name"
    />

    <input
      type="email"
      name="email"
      className="input-box"
      placeholder="Email"
    />

    <input
      type="tel"
      name="mobileNumber"
      className="input-box"
      placeholder="Mobile Number"
    />

    <input
      type="text"
      name="otp"
      className="input-box"
      placeholder="OTP Verification"
    />
  </div>
);

const WorkingDays = () => {
  const [layout, setLayout] = useState("list");

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  return (
    <div className="res-details">
      <h3>Working Days</h3>
      <div className="res-checkbox">
        <table>
          <tr>
            <td>
              <input type="checkbox" name="monday" id="monday" />
              Monday
            </td>
            <td>
              <input type="checkbox" name="tuesday" id="tuesday" />
              Tuesday
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="wednesday" id="wednesday" />
              Wednesday
            </td>
            <td>
              <input type="checkbox" name="thursday" id="thursday" />
              Thursday
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="friday" id="friday" />
              Friday
            </td>
            <td>
              <input type="checkbox" name="saturday" id="saturday" />
              Saturday
            </td>
          </tr>
          <td>
            <input type="checkbox" name="sunday" id="sunday" />
            Sunday
          </td>
          <br />
          <br />
        </table>
      </div>
    </div>
  );
};

const OpeningClosingTime = () => (
  <div className="res-details">
    <h3>Opening & Closing Time</h3>
    <br />
    <input
      type="time"
      name="openingTime"
      className="input-box"
      placeholder="Opening Time"
    />
    <br />
    <br />

    <input
      type="time"
      name="closingTime"
      className="input-box"
      placeholder="Closing Time"
    />
    <br />
    <br />
  </div>
);

export default RestaurantInfo;
