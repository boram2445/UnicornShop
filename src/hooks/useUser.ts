import { useState } from "react";
import { useEffect } from "react";
import { removeAccessToken, setAccessToken } from "../api/baseInstance";
import { getAuthState, reset, setUserData } from "../reducer/loginSlice";
import { useDispatch } from "react-redux";
import { reset as cartReset } from "../reducer/cartListSlice";
import { useAppSelector } from "../hooks";

export const useUser = () => {
  const dispatch = useDispatch();
  const [isLogined, setIsLogined] = useState(false);

  const { userType, userName } = useAppSelector(getAuthState);

  useEffect(() => {
    const userData = setAccessToken();
    userData.token &&
      dispatch(setUserData({ userName: userData.userName, userType: userData.userType }));
    setIsLogined(!!userData.token);
  }, []);

  const onLogout = () => {
    removeAccessToken();
    setIsLogined(false);
    dispatch(reset());
    userType === "BUYER" && dispatch(cartReset());
  };

  return { userName, userType, isLogined, onLogout };
};
