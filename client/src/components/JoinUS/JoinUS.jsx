// JoinUS.js

import React from "react";
import Stepper from "./Stepper";
import "./JoinUS.css";
import RestaurantDoc from "./RetaruantDoc/RestaurantDoc";
import RestaurantInfo from "./RestaruantInfo/RestaurantInfo";
import NavbarDouble from "../navbar/NavbarDouble";
import MenuSetup from "./MenuStep/MenuSetup";
import PartnerContract from "./PartnerContract/PartnerContract";

export default function JoinUS() {
  const list = [
    <Example1 />,
    <Example2 />,
    <Example3 />,
    <Example4 />,
    <Example5 />,
  ];
  const descriptions = [
    "Location, Owner details, Open & closing time",
    "FSSAI Ceritificate,GST/PAN",
    "Menu Name & Variations",
    "Yummy Foods Partner Contract",
    "Success...",
  ];
  return (
    <body className="join-us-body">
      <div className="nav-double">
        <NavbarDouble />
      </div>
      <div className="Home">
        <div className="JoinUS">
          <Stepper list={list} descriptions={descriptions} />
        </div>
      </div>
    </body>
  );
}

const Example1 = ({ onPrev, onNext }) => {
  return (
    <div className="container2">
      <h1>RESTAURANT INFORMATION</h1>
      <p>Location, Owner details, Open & closing time</p>
      <div>
        <RestaurantInfo />
        <button onClick={onPrev} className="step-btn-prev">
          Prev
        </button>
        <button onClick={onNext} className="step-btn">
          Save & Continue
        </button>
      </div>
    </div>
  );
};

const Example2 = ({ onPrev, onNext }) => {
  return (
    <div className="container2">
      <h1>Restaurant Documents</h1>
      <div>
        <RestaurantDoc />
        <button onClick={onPrev} className="step-btn-prev">
          Prev
        </button>
        <button onClick={onNext} className="step-btn">
          Save & Continue
        </button>
      </div>
    </div>
  );
};

const Example3 = ({ onPrev, onNext }) => {
  return (
    <div className="container2">
      <h1>Menu Setup</h1>
      <div>
        <MenuSetup />
        <button onClick={onPrev} className="step-btn-prev">
          Prev
        </button>
        <button onClick={onNext} className="step-btn">
          Save & Continue
        </button>
      </div>
    </div>
  );
};

const Example4 = ({ onPrev, onNext }) => {
  return (
    <div className="container2">
      <h1>Partner Contract</h1>
      <PartnerContract />
      <div>
        <button onClick={onPrev} className="step-btn-prev">
          Prev
        </button>
        <button onClick={onNext} className="step-btn">
          Save & Continue
        </button>
      </div>
    </div>
  );
};

const Example5 = ({ onPrev, onNext }) => {
  return (
    <div className="container2">
      <h1>Preview</h1>
      <div>
        <button onClick={onPrev} className="step-btn-prev">
          Prev
        </button>
        <button onClick={onNext} className="step-btn">
          Finish
        </button>
      </div>
    </div>
  );
};
