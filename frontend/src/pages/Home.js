import React, { useEffect, useRef, useState } from "react";
import { Header } from "../components/headers/Header";
import "./home.css";
import { LeftSideMenu } from "../components/home/leftSide/LeftSideMenu";
import { useSelector } from "react-redux";
import { RightSideMenu } from "../components/home/rightSide/RightSideMenu";
import { Story } from "../components/home/stories/Story";
import { NewPost } from "../components/post/NewPost";
import { EmailVerificationCode } from "../components/login/verifycationCodeEmail/EmailVerificationCode";
import { PostPopsUp } from "../components/post/PostPopsUp";
import { PostsViews } from "../components/post/postViewsUser/PostsViews";

export const Home = ({ setCreatePostVisible, posts }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const [visible, setVisible] = useState(true);

  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [posts]);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header />
      <div className="home_middle" ref={middle}>
        <Story />
        {!user.verified && <EmailVerificationCode user={user} />}

        <NewPost user={user} setCreatePostVisible={setCreatePostVisible} />
        <div className="posts">
          {posts.map((post, i) => {
            return <PostsViews key={i} post={post} user={user} />;
          })}
        </div>
      </div>
      <LeftSideMenu user={user} />
      <RightSideMenu user={user} />
    </div>
  );
};
