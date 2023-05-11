import React from "react";
import { ArrowDown, Dots } from "../../svg";
import { stories } from "../../data/homeData";
import { AddFriendSmallCard } from "./AddFriendSmallCard";
export const PeopleYouMayKnow = () => {
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((item, i) => {
          return <AddFriendSmallCard key={i} item={item} />;
        })}
      </div>
    </div>
  );
};
