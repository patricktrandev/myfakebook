import React from "react";

import { LoginInput } from "../../../components/inputs/loginInput/LoginInput";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
export const SearchEmailBox = ({
  email,
  setEmail,
  setLoading,
  setUserInfo,
  setError,
  setVisible,
  error,
}) => {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address ir required.")
      .email("Must be a valid email address.")
      .max(50, "Email address can't be more than 50 characters."),
  });
  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/finduser",
        { email }
      );

      setUserInfo(data);
      setError("");
      setLoading(false);
      //console.log(data);
      setVisible(1);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
