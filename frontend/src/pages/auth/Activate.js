import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/headers/Header";
import { Story } from "../../components/home/stories/Story";
import { NewPost } from "../../components/post/NewPost";
import { LeftSideMenu } from "../../components/home/leftSide/LeftSideMenu";
import { RightSideMenu } from "../../components/home/rightSide/RightSideMenu";
import { ActivateNotification } from "./ActivateNotification";
import "../home.css";
export const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  console.log(token);
  const { user } = useSelector((user) => ({ ...user }));

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  useEffect(() => {
    activateAccount();
  }, []);
  return (
    <div className="home">
      {success && (
        <ActivateNotification
          type="success"
          header="Account verification succeded."
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateNotification
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <div className="home_middle">
        <Story />
        <NewPost user={user} />
      </div>
      <LeftSideMenu user={user} />
      <RightSideMenu user={user} />
    </div>
  );
};
