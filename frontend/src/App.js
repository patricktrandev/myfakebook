import { Login } from "./pages/auth/Login";

import { Routes, Route } from "react-router-dom";
import { UserProfile } from "./pages/profile/UserProfile";
import { Home } from "./pages/Home";
import ProtectedRoute from "./helpers/ProtectedRoute";
import NotProtectedRoute from "./helpers/NotProtectedRoute";
import { Activate } from "./pages/auth/Activate";
function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} exact />
        <Route path="/profile" element={<UserProfile />} exact />
        <Route path="/activate/:token" element={<Activate />} exact />
      </Route>

      <Route element={<NotProtectedRoute />}>
        <Route path="/login" element={<Login />} exact />
      </Route>
    </Routes>
  );
}

export default App;
