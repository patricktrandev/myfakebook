import React, { useRef, useState } from "react";
import { UpdateProfilePicture } from "./updateProfile/UpdateProfilePicture";
import useClickOutside from "../../helpers/outsideClick";

export const ProfilePicture = ({ profile, visitor, photos }) => {
  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  let img = profile?.picture;
  let firstName = profile?.first_name;
  let lastName = profile?.last_name;

  return (
    <div className="profile_img_wrap">
      {show && (
        <UpdateProfilePicture pRef={pRef} setShow={setShow} photos={photos} />
      )}

      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${img})`,
            }}
          ></div>
          {!visitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {firstName} {lastName}
            <div className="othername">(Othername)</div>
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {visitor ? (
        ""
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
};
