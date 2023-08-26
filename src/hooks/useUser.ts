import { useState } from "react";
import { useEffect } from "react";
import { removeAccessToken, setAccessToken } from "../api/baseInstance";
import { logout } from "../reducer/loginSlice";
import { useDispatch } from "react-redux";
import { reset } from "../reducer/cartListSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const [isLogined, setIsLogined] = useState(false);
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const userData = setAccessToken();
    userData.token && setUser({ userName: userData.userName, userType: userData.userType });
    setIsLogined(!!userData.token);
  }, []);

  console.log(user);

  const onLogout = () => {
    removeAccessToken();
    setUser(initialState);
    setIsLogined(false);
    dispatch(logout());
    user.userType === "BUYER" && dispatch(reset());
  };

  return { userName: user.userName, userType: user.userType, isLogined, onLogout };
};

const initialState = { userName: "", userType: "BUYER" };
