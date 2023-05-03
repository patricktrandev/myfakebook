import React, { useState } from "react";
import axios from "axios";
import "./emailVerificationCode.css";
export const EmailVerificationCode = ({ user }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/send",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (err) {
      setError(err.response?.data.message);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a day from creating.
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        click here to resend verification link
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
};
