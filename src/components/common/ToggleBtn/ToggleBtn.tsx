import React from "react";
import { useLocation } from "react-router-dom";
import { getLoginUserType, setLoginUserType } from "../../../features/loginSlice";
import { getJoinUserType, setJoinUserType } from "../../../features/registerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import * as S from "./toggleBtnStyle";

function ToggleBtn() {
  const dispatch = useAppDispatch();
  const path = useLocation()?.pathname;

  const userType = useAppSelector(path.includes("login") ? getLoginUserType : getJoinUserType);

  const handleToggleBtn = (type: string) => {
    if (type === "BUYER") {
      path.includes("login") ? dispatch(setLoginUserType(type)) : dispatch(setJoinUserType(type));
    } else {
      path.includes("login") ? dispatch(setLoginUserType(type)) : dispatch(setJoinUserType(type));
    }
  };

  return (
    <S.ToggleBox>
      <S.ToggleBtn on={(userType === "BUYER").toString()} onClick={() => handleToggleBtn("BUYER")}>
        구매회원 {path.includes("login") ? "로그인" : "회원가입"}
      </S.ToggleBtn>
      <S.ToggleBtn
        on={(userType === "SELLER").toString()}
        onClick={() => handleToggleBtn("SELLER")}
      >
        판매회원 {path.includes("login") ? "로그인" : "회원가입"}
      </S.ToggleBtn>
    </S.ToggleBox>
  );
}

export default ToggleBtn;
