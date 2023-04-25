import React, { useState } from "react";
import "./login.css";
import { LoginForm } from "../../components/login/LoginForm";
import { FooterLogin } from "../../components/login/FooterLogin";
import { RegisterForm } from "../../components/login/RegisterForm";

export const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}

        <FooterLogin />
      </div>
    </div>
  );
};
