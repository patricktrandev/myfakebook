import { Form, Formik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CircleLoader from "react-spinners/CircleLoader";
import { RegisterInput } from "../inputs/registerInput/RegisterInput";
import * as Yup from "yup";
import { DateOfBirthSelect } from "./DateOfBirthSelect";
import { GenderSelect } from "./GenderSelect";
import { LOGIN } from "../../redux/constant/userConstant";

const registerInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};
export const RegisterForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [registerUser, setRegisterUser] = useState(registerInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = registerUser;

  const yTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };
  const years = Array.from(new Array(124), (val, index) => yTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDaysInMonth = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(
    new Array(getDaysInMonth()),
    (val, index) => 1 + index
  );
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
  });
  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/register",
        registerUser
      );
      setError("");
      if (data) {
        setLoading(false);
        setSuccess(data.message);
      }

      setTimeout(() => {
        dispatch({ type: LOGIN, payload: data });
        Cookies.set("user", JSON.stringify(data));
        navigate("/");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setSuccess("");
      setError(err.response.data.message);
    }
  };

  const handleRegisterSubmit = () => {
    let currentDate = new Date();
    let pickedDate = new Date(bYear, bMonth - 1, bDay);
    let atLeast14 = new Date(1970 + 14, 0, 1);
    let noMore80 = new Date(1970 + 80, 0, 1);
    console.log(pickedDate - currentDate);
    console.log(atLeast14);
    if (currentDate - pickedDate < atLeast14) {
      setDateError(
        "It looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
      );
    } else if (currentDate - pickedDate > noMore80) {
      setDateError(
        "It looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
      );
    } else if (gender === "") {
      setDateError("");
      setGenderError(
        "Please choose a gender. You can change who can see this later."
      );
    } else {
      setDateError("");
      setGenderError("");
      registerSubmit();
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={handleRegisterSubmit}
        >
          {(formik) => (
            <Form>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">
                  Sign Up
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircleLoader color="red" loading={loading} size={50} />
              </div>

              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
