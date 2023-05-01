import React, { useRef, useState } from "react";
import { Header } from "../components/headers/Header";
import "./home.css";
import { LeftSideMenu } from "../components/home/leftSide/LeftSideMenu";
import { useSelector } from "react-redux";
import { RightSideMenu } from "../components/home/rightSide/RightSideMenu";
import { Story } from "../components/home/stories/Story";

export const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <div className="home_middle">
        <Story />
      </div>
      <LeftSideMenu user={user} />
      <RightSideMenu user={user} />
    </div>
  );
};
