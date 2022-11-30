import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedOutlet() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn",isLoggedIn);
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" />;
  }
}
