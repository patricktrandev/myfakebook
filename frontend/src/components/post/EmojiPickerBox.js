import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
export const EmojiPickerBox = ({ user, text, setText, type2 }) => {
  const [cursorPos, setCursorPos] = useState();
  const textRef = useRef(null);
  const [picker, setPicker] = useState(false);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPos;
  }, [cursorPos]);
  const handleEmojiClick = (e, { emoji }) => {
    const refText = textRef.current;
    refText.focus();
    const start = text.substring(0, refText.selectionStart);
    const end = text.substring(refText.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPos(start.length + emoji.length);
  };
  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          ref={textRef}
          maxLength="100"
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          className={`post_input ${type2 ? "input2" : ""}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
};
