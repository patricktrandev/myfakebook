import React, { useRef, useState } from "react";
import { Header } from "../components/headers/Header";
import "./home.css";
import { LeftSideMenu } from "../components/home/leftSide/LeftSideMenu";
import { useSelector } from "react-redux";
import { RightSideMenu } from "../components/home/rightSide/RightSideMenu";
import { Story } from "../components/home/stories/Story";
import { NewPost } from "../components/post/NewPost";
import { EmailVerificationCode } from "../components/login/verifycationCodeEmail/EmailVerificationCode";
import { PostPopsUp } from "../components/post/PostPopsUp";

export const Home = ({ setCreatePostVisible }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const [visible, setVisible] = useState(true);
  return (
    <div className="home">
      <Header />
      <div className="home_middle">
        <Story />
        {!user.verified && <EmailVerificationCode user={user} />}

        <NewPost user={user} setCreatePostVisible={setCreatePostVisible} />
      </div>
      <LeftSideMenu user={user} />
      <RightSideMenu user={user} />
    </div>
  );
};
