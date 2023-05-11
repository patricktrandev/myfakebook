import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Logo,
  Search,
  HomeActive,
  Friends,
  Watch,
  Market,
  Gaming,
  Home,
  Menu,
  Messenger,
  Notifications,
} from "../../svg";
import "./header.css";
import { SearchMenu } from "./SearchMenu";
import { AllMenu } from "./AllMenu";
import useClickOutside from "../../helpers/outsideClick";
import { UserMenu } from "./UserMenu";
export const Header = ({ page }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [profileMenuClick, setProfileMenuClick] = useState(false);
  const allMenu = useRef(null);
  const usermenu = useRef(null);
  console.log(user);
  const color = "#65676b";

  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setProfileMenuClick(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}

      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : ""}`}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <div
          className={`circle_icon hover1 ${showAllMenu ? "active_header" : ""}`}
          ref={allMenu}
          onClick={() => {
            setShowAllMenu((prev) => !prev);
          }}
        >
          <div style={{ transform: "translateY(2px)" }}>
            <Menu />
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div className="profile_link" ref={usermenu}>
          <div
            onClick={() => {
              setProfileMenuClick((prev) => !prev);
            }}
          >
            <img src={user?.picture} alt="" />
          </div>

          {profileMenuClick && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};
