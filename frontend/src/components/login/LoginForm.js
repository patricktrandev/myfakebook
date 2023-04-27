import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import * as Yup from "yup";
import { LoginInput } from "../inputs/loginInput/LoginInput";
import { LOGIN } from "../../redux/constant/userConstant";
const loginInfos = {
  email: "",
  password: "",
};

export const LoginForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Oops! Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required."),
  });
  const handleLoginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8000/api/v1/login", {
        email,
        password,
      });
      const { message, ...rest } = data;
      if (data) {
        setLoading(false);
      }
      dispatch({ type: LOGIN, payload: rest });
      Cookies.set("user", JSON.stringify(rest));
      navigate("/");
    } catch (err) {
      setLoading(false);

      setError(err.response.data.message);
    }
  };
  return (
    <>
      <div className="login_wrap">
        <div className="login_1">
          <img src="../../icons/facebook.svg" alt="" />
          <span>
            Facebook helps you connect and share with the people in your life.
          </span>
          <span style={{ fontSize: "12px" }}>
            Author : Patrick - Only for educational purpose
          </span>
        </div>
        <div className="login_2">
          <div className="login_2_wrap">
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
              validationSchema={loginValidation}
              onSubmit={handleLoginSubmit}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    name="email"
                    type="text"
                    placeholder="Email address or phone number"
                    onChange={handleLogin}
                  />
                  <LoginInput
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleLogin}
                    bottom
                  />
                  <button type="submit" className="blue_btn">
                    Log In
                  </button>
                  <br />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircleLoader color="red" loading={loading} size={50} />
                  </div>

                  {error && <div className="error_text">{error}</div>}
                </Form>
              )}
            </Formik>
            <Link to="/forgot" className="forgot_password">
              Forgotten password?
            </Link>
            <div className="sign_splitter"></div>
            <button
              className="blue_btn open_signup"
              onClick={() => {
                setVisible(true);
              }}
            >
              Create Account
            </button>
          </div>

          <Link to="/" className="sign_extra">
            <b>Create a Page </b>
            for a celebrity, brand or business.
          </Link>
        </div>
      </div>
    </>
  );
};
