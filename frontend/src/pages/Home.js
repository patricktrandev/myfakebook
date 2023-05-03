import React, { useRef, useState } from "react";
import { Header } from "../components/headers/Header";
import "./home.css";
import { LeftSideMenu } from "../components/home/leftSide/LeftSideMenu";
import { useSelector } from "react-redux";
import { RightSideMenu } from "../components/home/rightSide/RightSideMenu";
import { Story } from "../components/home/stories/Story";
import { NewPost } from "../components/post/NewPost";
import { EmailVerificationCode } from "../components/login/verifycationCodeEmail/EmailVerificationCode";

export const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <div className="home_middle">
        <Story />
        {!user.verified && <EmailVerificationCode user={user} />}

        <NewPost user={user} />
      </div>
      <LeftSideMenu user={user} />
      <RightSideMenu user={user} />
    </div>
  );
};
