import { Formik, Form } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { LoginInput } from "../../../components/inputs/loginInput/LoginInput";
import axios from "axios";
export const CodeVerificationBox = ({
  code,
  setCode,
  error,
  loading,
  setLoading,
  setVisible,
  setError,
  userInfo,
}) => {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "Code must be 5 characters.")
      .max("5", "Code must be 5 characters."),
  });
  const email = userInfo?.email;
  const verifyCode = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/v1/validatereset", {
        email,
        code,
      });
      setLoading(false);
      setError("");
      setVisible(3);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };
  console.log(email);
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code verification</div>
      <div className="reset_form_text">
        Please enter code that been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
