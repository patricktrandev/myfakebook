import React, { useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/outsideClick";
export const SearchMenu = ({ color, setShowSearchMenu }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return />
          </div>
        </div>
        <div className="search">
          <div
            ref={input}
            onClick={() => {
              input.current.focus();
            }}
          >
            {iconVisible && <Search color={color} />}
          </div>
          <input
            type="text"
            autoFocus
            placeholder="Search Facebook"
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
};
