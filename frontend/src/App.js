import axios from "axios";

import { Login } from "./pages/auth/Login";

import { Routes, Route } from "react-router-dom";
import { UserProfile } from "./pages/profile/UserProfile";
import { Home } from "./pages/Home";
import ProtectedRoute from "./helpers/ProtectedRoute";
import NotProtectedRoute from "./helpers/NotProtectedRoute";
import { Activate } from "./pages/auth/Activate";
import { ResetPassword } from "./pages/auth/resetPassword/ResetPassword";
import { PostPopsUp } from "./components/post/PostPopsUp";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { postsReducer } from "./redux/reducer/PostReducer";

function App() {
  const { user } = useSelector((user) => ({ ...user }));
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  console.log(posts);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/getAllPosts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  console.log(posts);

  return (
    <div>
      {createPostVisible && (
        <PostPopsUp user={user} setCreatePostVisible={setCreatePostVisible} />
      )}

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={
              <UserProfile setCreatePostVisible={setCreatePostVisible} />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <UserProfile setCreatePostVisible={setCreatePostVisible} />
            }
            exact
          />
          <Route
            path="/"
            element={
              <Home setCreatePostVisible={setCreatePostVisible} posts={posts} />
            }
            exact
          />

          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>

        <Route element={<NotProtectedRoute />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/forgot" element={<ResetPassword />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
