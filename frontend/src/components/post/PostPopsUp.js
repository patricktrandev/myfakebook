import React, { useEffect, useRef, useState } from "react";
import "./postpopup.css";
import PulseLoader from "react-spinners/PulseLoader";
import { LiveVideo, Photo, Feeling } from "../../svg";
import { EmojiPickerBox } from "./EmojiPickerBox";
import { AddToYourPost } from "./AddToYourPost";
import { ImagePreview } from "./ImagePreview";
import {
  createPostAction,
  uploadImagesAction,
} from "../../redux/action/PostAction";
import useClickOutside from "../../helpers/outsideClick";
import { PostError } from "./PostError";
import dataURItoBlob from "../../helpers/convertDataURItoBlob";
export const PostPopsUp = ({ user, setCreatePostVisible }) => {
  const [text, setText] = useState("");
  const popup = useRef();
  const [showPrev, setShowPrev] = useState(false);

  const [images, setImages] = useState([]);
  const [background, setBackground] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useClickOutside(popup, () => {
    setCreatePostVisible(false);
  });
  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPostAction(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      //console.log(response);
      if (response === "ok") {
        setBackground("");
        setText("");
        setCreatePostVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      console.log(postImages);
      const path = `${user.username}/post_Images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const responseImage = await uploadImagesAction(
        formData,
        path,
        user.token
      );
      console.log(responseImage);
      const res = await createPostAction(
        null,
        null,
        text,
        responseImage,
        user.id,
        user.token
      );
      console.log(res);
      setLoading(false);
      if (res === "ok") {
        setText("");
        setImages("");
        setCreatePostVisible(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPostAction(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setBackground("");
        setText("");
        setCreatePostVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setCreatePostVisible(false);
            }}
          >
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
        <></>
        <>
          {showPrev ? (
            <ImagePreview
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              images={images}
              setImages={setImages}
              setShowPrev={setShowPrev}
              setError={setError}
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
        </>

        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit" onClick={postSubmit} disabled={loading}>
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
};
