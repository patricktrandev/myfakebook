import React, { useRef, useState } from "react";
import { Header } from "../components/headers/Header";
import useClickOutside from "../helpers/outsideClick";
import { LeftSideMenu } from "../components/home/leftSide/LeftSideMenu";
import { useSelector } from "react-redux";

export const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <LeftSideMenu user={user} />
    </div>
  );
};
