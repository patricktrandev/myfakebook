import React, { useRef, useState } from "react";
import { Header } from "../components/headers/Header";
import useClickOutside from "../helpers/outsideClick";

export const Home = () => {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });

  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
};
