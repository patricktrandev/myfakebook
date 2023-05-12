import React, { useEffect, useReducer } from "react";
import axios from "axios";

import { photosReducer } from "../../redux/reducer/ProfileReducer";

export const Photos = ({ photos }) => {
  let totalCount = photos?.total_count;
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {totalCount === 0
          ? ""
          : totalCount === 1
          ? "1 Photo"
          : `${totalCount} photos`}
      </div>
      <div className="profile_card_grid">
        {photos?.resources &&
          photos?.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};
