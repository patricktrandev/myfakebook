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
import { useState } from "react";
function App() {
  const { user } = useSelector((user) => ({ ...user }));
  const [createPostVisible, setCreatePostVisible] = useState(false);

  return (
    <div>
      {createPostVisible && (
        <PostPopsUp user={user} setCreatePostVisible={setCreatePostVisible} />
      )}

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Home setCreatePostVisible={setCreatePostVisible} />}
            exact
          />
          <Route path="/profile" element={<UserProfile />} exact />
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
