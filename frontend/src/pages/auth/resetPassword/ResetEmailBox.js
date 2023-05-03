import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export const ResetEmailBox = ({
  userInfo,
  email,
  error,
  setError,
  setVisible,
  setUserInfo,
  loading,
  setLoading,
}) => {
  console.log(email);
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/v1/sendResetCodeVerification",
        { email }
      );

      setError("");
      setVisible(2);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  console.log(userInfo);
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userInfo?.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfo?.picture} alt="" />
          <span>{userInfo?.email}</span>
          {!userInfo && <span>Facebook user</span>}
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button
          onClick={() => {
            sendEmail();
          }}
          className="blue_btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
