import React, { useState } from "react";
import "./resetpassword.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FooterLogin } from "../../../components/login/FooterLogin";
import Cookies from "js-cookie";
import { SearchEmailBox } from "./SearchEmailBox";
import { ResetEmailBox } from "./ResetEmailBox";
import { CodeVerificationBox } from "./CodeVerificationBox";
import { ChangePasswordBox } from "./ChangePasswordBox";
export const ResetPassword = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const navigate = useNavigate;
  const dispatch = useDispatch;
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const [error, setError] = useState("");
  const [codeVerified, setCodeVerified] = useState("");
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleLogOut = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="/icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                handleLogOut();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchEmailBox
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfo && (
          <ResetEmailBox
            email={email}
            userInfo={userInfo}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerificationBox
            user={user}
            code={codeVerified}
            setCode={setCodeVerified}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfo={userInfo}
          />
        )}

        {visible === 3 && (
          <ChangePasswordBox
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfo={userInfo}
          />
        )}
      </div>

      <FooterLogin />
    </div>
  );
};
