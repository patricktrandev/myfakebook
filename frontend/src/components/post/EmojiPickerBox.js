import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
export const EmojiPickerBox = ({
  picker,
  textRef,
  setPicker,
  text,
  setText,
}) => {
  const [cursorPos, setCursorPos] = useState();
  const handleEmojiClick = (e, { emoji }) => {
    const refText = textRef.current;
    refText.focus();
    const start = text.substring(0, refText.selectionStart);
    const end = text.substring(refText.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPos(start.length + emoji.length);
  };
  useEffect(() => {
    textRef.current.selectionEnd = cursorPos;
  }, [cursorPos]);
  return (
    <div className="post_emojis_wrap">
      {picker && (
        <div className="comment_emoji_picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <img src="/icons/colorful.png" alt="" />
      <i
        className="emoji_icon_large"
        onClick={() => setPicker((prev) => !prev)}
      ></i>
    </div>
  );
};
