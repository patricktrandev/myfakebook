import React, { useRef, useState } from "react";
import useClickOutside from "../../../helpers/outsideClick";
import { PostViewMenuItem } from "./PostViewMenuItem";

export const PostViewMenu = ({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
}) => {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  console.log(postUserId, userId);
  const menu = useRef(null);
  useClickOutside(menu, () => setShowMenu(false));
  return (
    <ul className="post_menu" ref={menu}>
      {test && <PostViewMenuItem icon="pin_icon" title="Pin Post" />}
      <PostViewMenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved items."
      />
      <div className="line"></div>
      {test && <PostViewMenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <PostViewMenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && (
        <PostViewMenuItem icon="download_icon" title="Download" />
      )}
      {imagesLength && (
        <PostViewMenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && (
        <PostViewMenuItem img="../../../icons/lock.png" title="Edit audience" />
      )}
      {test && (
        <PostViewMenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && (
        <PostViewMenuItem icon="delete_icon" title="Turn off translations" />
      )}
      {test && <PostViewMenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <PostViewMenuItem
          icon="refresh_icon"
          title="Refresh share attachment"
        />
      )}
      {test && <PostViewMenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <PostViewMenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <PostViewMenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
};
