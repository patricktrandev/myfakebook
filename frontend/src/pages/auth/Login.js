import React from "react";
import "./login.css";
import { LoginForm } from "../../components/login/LoginForm";
import { FooterLogin } from "../../components/login/FooterLogin";
import { RegisterForm } from "../../components/login/RegisterForm";

export const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm />

        <FooterLogin />
      </div>
    </div>
  );
};
