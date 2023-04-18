import React from "react";
import "./login.css";
import { LoginForm } from "../../components/login/LoginForm";
import { FooterLogin } from "../../components/login/FooterLogin";

export const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <div className="register"></div>
        <FooterLogin />
      </div>
    </div>
  );
};
