import React from "react";

export const ContactItem = ({ user }) => {
  return (
    <div className="contact hover3">
      <div className="small_avatar">
        <img src={user.picture} alt="" />
      </div>
      <span>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
};
