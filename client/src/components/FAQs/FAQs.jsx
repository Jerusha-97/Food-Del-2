// src/FAQsModal.js
import React, { useState } from "react";
import "./FAQs.css";

const FAQs = ({ isVisible, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is Yummy FooDs?",
      answer:
        "Yummy FooDs is a food delivery service that brings food from your favorite restaurants directly to your doorstep.",
    },
    {
      question: "How does Yummy FooDs work?",
      answer:
        "You can browse through a list of restaurants, select your favorite dishes, and place an order. A Yummy FooDs delivery partner will pick up the order from the restaurant and deliver it to you.",
    },
    {
      question: "How can I contact Yummy FooDs customer care?",
      answer:
        'You can reach out to Yummy FooDs customer care through the app or website under the "Help" section.',
    },
    {
      question: "What payment methods does Yummy FooDs accept?",
      answer:
        "Yummy FooDs accepts a variety of payment methods including credit/debit cards, net banking, and popular mobile wallets.",
    },
    // Add more FAQs here
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div
        className={`faq-overlay ${isVisible ? "visible" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`faq-container ${isVisible ? "visible" : ""}`}>
        <h1>Frequently Asked Questions</h1>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleAnswer(index)}
          >
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQs;
