import React from "react";

export const CreateItem = ({ name, icon }) => {
  return (
    <div className="all_right_item hover1">
      <div className="all_right_circle">
        <i className={icon}></i>
      </div>
      {name}
    </div>
  );
};
