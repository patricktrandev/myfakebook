import React, { useEffect, useRef, useState } from "react";
import "./postpopup.css";

import { LiveVideo, Photo, Feeling } from "../../svg";
import { EmojiPickerBox } from "./EmojiPickerBox";
import { AddToYourPost } from "./AddToYourPost";
import { ImagePreview } from "./ImagePreview";
import useClickOutside from "../../helpers/outsideClick";
export const PostPopsUp = ({ user, setVisible }) => {
  const [text, setText] = useState("");
  const popup = useRef();
  const [showPrev, setShowPrev] = useState(false);

  const [images, setImages] = useState([]);
  const [background, setBackground] = useState(false);
  useClickOutside(popup, () => {
    setVisible(false);
  });
  return (
    <div className="blur" ref={popup}>
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
          <EmojiPickerBox
            user={user}
            text={text}
            setText={setText}
            setBackground={setBackground}
            background={background}
          />
        )}

        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};
