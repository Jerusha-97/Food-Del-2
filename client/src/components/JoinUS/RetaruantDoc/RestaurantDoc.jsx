import React from "react";
import "./RestaurantDoc.css"; // Import CSS file for styling

const RestaurantDoc = () => {
  return (
    <div className="container2">
      <div className="doc-section res-details">
        <h2>FSSAI Certificate</h2>
        <input
          type="text"
          name="fssainum"
          className="input-box"
          placeholder="FSSAI CERTIFICATE ID"
        />
        <input
          type="file"
          name="fssai"
          className="input-box"
          placeholder="Upload or provide details for the FSSAI Certificate."
        />
      </div>
      <div className="doc-section res-details">
        <h2>GST Certificate</h2>
        <p>Upload or provide details for the GST Certificate.</p>
        <input
          type="text"
          name="gstnum"
          className="input-box"
          placeholder="GST CERTIFICATE ID"
        />
        <input
          type="file"
          name="gst"
          className="input-box"
          placeholder="Upload or provide details for the GST Certificate."
        />
      </div>
      <div className="doc-section res-details">
        <h2>Owner Aadhar Card</h2>
        <p>Upload or provide details for the Owner's Aadhar Card.</p>
        <input
          type="text"
          name="aadharNum"
          className="input-box"
          placeholder="AADHAR CARD NUMBER"
        />
        <input
          type="file"
          name="aadhar"
          className="input-box"
          placeholder="Upload or provide details for the Owner's Aadhar Card."
        />
      </div>
    </div>
  );
};

export default RestaurantDoc;
