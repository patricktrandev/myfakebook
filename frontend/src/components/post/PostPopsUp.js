import React, { useEffect, useRef, useState } from "react";
import "./postpopup.css";

import { LiveVideo, Photo, Feeling } from "../../svg";
import { EmojiPickerBox } from "./EmojiPickerBox";
import { AddToYourPost } from "./AddToYourPost";
import { ImagePreview } from "./ImagePreview";
export const PostPopsUp = ({ user }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(true);

  const [images, setImages] = useState([]);
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

        {showPrev ? (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        ) : (
          <EmojiPickerBox user={user} text={text} setText={setText} />
        )}

        <AddToYourPost />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};
