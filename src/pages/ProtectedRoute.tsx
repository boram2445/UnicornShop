import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { getToken } from "../reducer/loginSlice";

function ProtectedRoute() {
  const TOKEN = useAppSelector(getToken);

  if (!TOKEN) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
