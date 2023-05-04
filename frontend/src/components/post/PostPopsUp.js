import React, { useEffect, useRef, useState } from "react";
import "./postpopup.css";

import { LiveVideo, Photo, Feeling } from "../../svg";
import { EmojiPickerBox } from "./EmojiPickerBox";
import { AddToYourPost } from "./AddToYourPost";
export const PostPopsUp = ({ user }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);

  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="/icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        <textarea
          ref={textRef}
          className="post_input"
          maxLength="100"
          value={text}
          placeholder={`What's on your mind? ${user?.first_name} `}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        {showPrev && (
          <div className="flex_center">
            <textarea
              className="post_input"
              maxLength="100"
              value={text}
              placeholder={`What's on your mind? ${user.first_name} `}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
        )}

        <EmojiPickerBox
          picker={picker}
          setPicker={setPicker}
          textRef={textRef}
          text={text}
          setText={setText}
        />

        <AddToYourPost />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};
