import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
export const ActivateNotification = ({ type, header, text, loading }) => {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        <div className="popup_middle">
          <PacmanLoader color="red" size={25} loading={loading} />
        </div>
      </div>
    </div>
  );
};
