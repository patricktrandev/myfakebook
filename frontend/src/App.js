import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

import { Routes, Route } from "react-router-dom";
import { UserProfile } from "./pages/profile/UserProfile";
import { Home } from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/register" element={<Register />} exact />
      <Route path="/login" element={<Login />} exact />
      <Route path="/profile" element={<UserProfile />} exact />
    </Routes>
  );
}

export default App;
