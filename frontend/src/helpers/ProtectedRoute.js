import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../pages/auth/Login";

export default function ProtectedRoute() {
  const { user } = useSelector((user) => ({ ...user }));
  return user ? <Outlet /> : <Login />;
}
