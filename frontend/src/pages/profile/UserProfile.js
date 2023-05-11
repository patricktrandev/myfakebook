import React, { useEffect, useReducer } from "react";
import axios from "axios";
import "./UserProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { profileReducer } from "../../redux/reducer/ProfileReducer";
import { Header } from "../../components/headers/Header";
import { CoverProfile } from "./CoverProfile";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileMenu } from "./ProfileMenu";
import { PeopleYouMayKnow } from "./PeopleYouMayKnow";
export const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
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
  console.log(visitor);
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
  console.log(profile);
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <CoverProfile user={user} visitor={visitor} />
          <ProfilePicture profile={profile} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
          </div>
        </div>
      </div>
    </div>
  );
};
