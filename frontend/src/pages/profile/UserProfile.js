import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { profileReducer } from "../../redux/reducer/ProfileReducer";
import { Header } from "../../components/headers/Header";
import { CoverProfile } from "./CoverProfile";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileMenu } from "./ProfileMenu";
import { PeopleYouMayKnow } from "./PeopleYouMayKnow";
import { GridPost } from "./GridPost";
import { NewPost } from "../../components/post/NewPost";
import { PostsViews } from "../../components/post/postViewsUser/PostsViews";
import { Photos } from "./Photos";
import { Friends } from "./Friends";
export const UserProfile = ({ setCreatePostVisible }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;
  console.log(userName);
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);
  var visitor = userName === user.username ? false : true;
  console.log(userName);
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";
  const token = user?.token;
  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            "http://localhost:8000/api/v1/listImages",
            { path, max, sort },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  // console.log(path);
  console.log(profile);
  // console.log(photos);
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <CoverProfile
            cover={profile.cover}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfilePicture
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Photos photos={photos} />
                <Friends />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2023
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <NewPost
                    user={user}
                    setCreatePostVisible={setCreatePostVisible}
                  />
                )}
                <GridPost />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <PostsViews
                        post={post}
                        user={user}
                        key={post._id}
                        profile
                      />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
