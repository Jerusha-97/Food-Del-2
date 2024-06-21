import React, { useState, useEffect, useRef } from "react";
import NavbarDouble from "../navbar/NavbarDouble";
import "./JoinUS1st.css"; // Import CSS file for JoinUS1st component
import { assets } from "../../assets/assets";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const texts = [
  "Access to Yummy Foods tools and support",
  "Provided Trusted Yummy Foods",
  "Join us and reach more customers",
];

const JoinUS1st = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isOtpForm, setIsOtpForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timerInterval;
    if (isOtpForm && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsOtpForm(false); // Switch back to the Get Started page when timer reaches 0
    }

    return () => clearInterval(timerInterval);
  }, [isOtpForm, timer]);

  const handleContinue = async () => {
    if (inputValue.trim() !== "") {
      setIsOtpForm(true);
      setTimer(60); // Reset the timer when entering OTP form

      // Send request to backend to send OTP
      try {
        const response = await axios.post(
          "http://localhost:4000/api/join/sendOTP",
          { email: inputValue }
        );
        console.log(response.data); // For testing purposes
        // Handle success (e.g., display OTP sent message)
      } catch (error) {
        console.error("Error sending OTP:", error);
        // Handle error (e.g., display error message)
      }
    } else {
      alert("Please enter a valid Restaurant ID / Email ID");
    }
  };

  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Allow only numeric input
    if (value) {
      const newOtpValue = [...otpValue];
      newOtpValue[index] = value;
      setOtpValue(newOtpValue);

      // Focus on the next input box if the current one is filled
      if (index < 5 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/join/verifyOTP",
        { email: inputValue, otp: otpValue.join("") } // Include email in the request payload
      );
      if (response.status === 200) {
        navigate("/restaurant/register/joinus");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleGoBack = () => {
    setIsOtpForm(false);
  };

  return (
    <div className="nav-double ">
      <NavbarDouble />
      <div className="background ">
        <div className="overlay">
          <div className="content-container">
            <div className="text-container">
              <img src={assets.logo} alt="logo" />
              <h1>{texts[currentTextIndex]}</h1>
              <p>Partner with Yummy Foods and grow your business</p>
              <div className="underline-bars">
                {texts.map((_, index) => (
                  <div
                    key={index}
                    className={`underline-bar ${
                      index === currentTextIndex ? "active" : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="form-container">
              <div className="form-box">
                <h2>{isOtpForm ? "Enter OTP" : "Get Started"}</h2>
                {isOtpForm ? (
                  <>
                    <div className="otp-inputs">
                      {otpValue.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={data}
                          onChange={(e) => handleOtpChange(e.target, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          ref={(el) => (inputRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleOtpSubmit}
                      to="/joinus"
                    >
                      Verify OTP
                    </button>
                    <p className="timer">Time remaining: {timer}s</p>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter Restaurant ID / Email ID"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="button" onClick={handleContinue}>
                      Continue
                    </button>
                  </>
                )}
                <p>
                  By signing up, I agree to Yummy Foods's{" "}
                  <a href="#">terms & conditions</a>
                </p>
                {isOtpForm && (
                  <div className="back-arrow" onClick={handleGoBack}>
                    &lt;--
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUS1st;
