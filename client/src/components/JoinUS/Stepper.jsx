import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const customLabels = [
  "Restaurant Info",
  "Restaurant Documents",
  "Menu SetUp",
  "Partner Contract",
  "Finish",
];
const Stepper = ({ list, descriptions }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const stepsCount = list.length;

  const steps = [];
  for (let i = 0; i < stepsCount; i++) {
    steps.push(
      <div key={i} className="step-wrapper">
        <div
          onClick={() => !isFinished && setCurrentStep(i)}
          className={`steps ${currentStep >= i ? "active" : ""} ${
            currentStep > i ? "completed" : ""
          } ${isFinished && currentStep === i ? "completed" : ""}`}
        >
          {currentStep > i || (isFinished && currentStep === i) ? "✓" : i + 1}
        </div>
        <div className="step-label">
          <label className={currentStep === i ? "bold" : ""}>
            {customLabels[i]}
          </label>{" "}
          <h6 className={currentStep === i ? "bold" : ""}>{descriptions[i]}</h6>
        </div>
      </div>
    );
  }

  const onPrev = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNext = () => {
    if (currentStep !== list.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    const progressLine = document.querySelector(".progress-line");
    const stepsWrapper = document.querySelector(".steps-wrapper");
    const stepHeight = stepsWrapper.offsetHeight / stepsCount; // Height of each step
    const middleOfStep = stepHeight / 2; // Middle position of each step
    const progressHeight = currentStep * stepHeight + middleOfStep; // Height of progress line based on current step
    progressLine.style.height = `${progressHeight}px`;
  }, [currentStep, stepsCount]);

  return (
    <section className="stepper">
      <div className="steps-container">
        <div className="progress-container">
          <div className="progress-line"></div>
          <div className="steps-wrapper">{steps}</div>
        </div>
      </div>
      <div className="step-content">
        {isFinished ? (
          <div className="congrats-message">
            <h1>Congrats! You've completed all steps.</h1>
          </div>
        ) : (
          React.cloneElement(list[currentStep], { onPrev, onNext })
        )}
      </div>
    </section>
  );
};

Stepper.prop

export default Stepper;
