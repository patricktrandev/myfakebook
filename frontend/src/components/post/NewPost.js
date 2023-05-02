import React from "react";
import "./newpost.css";
import { LiveVideo, Photo, Feeling } from "../../svg";
export const NewPost = ({ user }) => {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover2">
          Hey {user?.first_name}, what's on your mind?
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};
