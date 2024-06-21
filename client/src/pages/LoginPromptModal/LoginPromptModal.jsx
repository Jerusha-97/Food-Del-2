import React from "react";
import Modal from "react-modal";
import "./LoginPromptModal.css";
import { Link } from "react-router-dom";

const LoginPromptModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Prompt"
      className="login-prompt-modal"
      overlayClassName="login-prompt-modal-overlay"
    >
      <h2>Please Login</h2>
      <p>Only Yummy Foods Login Users are Ordering Foods!..</p>
      <p>Please Log In 🙃... </p><Link to="/login">
      <button onClick={onRequestClose} className="log">
        Login here
      </button></Link>
    </Modal>
  );
};

export default LoginPromptModal;
