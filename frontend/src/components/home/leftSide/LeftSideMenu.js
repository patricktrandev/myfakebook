import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftSideMenu.css";
import { left } from "../../../data/homeData";
import { LeftLink } from "./LeftLink";
import { ArrowDown } from "../../../svg";
import { Shortcut } from "./Shortcut";

export const LeftSideMenu = ({ user }) => {
  const [visible, setVisible] = useState(true);
  return (
    <div
      className={`left_home ${!visible ? "scrollbar" : "scrollbar_hidden"} `}
    >
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 5).map((item, i) => {
        return (
          <LeftLink
            key={i}
            img={item.img}
            notification={item.notification}
            text={item.text}
          />
        );
      })}

      {visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(false);
          }}
        >
          <div className="small_circle">
            <ArrowDown />
          </div>
          <div className="col">
            <div className="col_1">See More</div>
          </div>
        </div>
      )}

      {!visible &&
        left.slice(5, left.length).map((item, i) => {
          return (
            <LeftLink
              key={i}
              img={item.img}
              notification={item.notification}
              text={item.text}
            />
          );
        })}
      {!visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle rotate360">
            <ArrowDown />
          </div>
          <div className="col">
            <div className="col_1">Show Less</div>
          </div>
        </div>
      )}

      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut img={"/images/ytb.png"} link={""} name={"Study With me"} />
        <Shortcut img={"/images/insta.png"} link={""} name={"Coding"} />
      </div>
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>{" "}
        </Link>
        <span>. </span>
        <Link to="/"></Link>Cookies <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
};
