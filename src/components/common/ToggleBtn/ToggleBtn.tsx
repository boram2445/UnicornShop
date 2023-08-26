import React from "react";
import { useLocation } from "react-router-dom";
import { UserType } from "../../../types/auth";
import * as S from "./toggleBtnStyle";

type Props = {
  toggleUserType: UserType;
  onToggle: (type: UserType) => void;
};

function ToggleBtn({ toggleUserType, onToggle }: Props) {
  const { pathname } = useLocation();

  const handleToggleBtn = (type: string) => {
    type === "BUYER" ? onToggle("BUYER") : onToggle("SELLER");
  };

  return (
    <S.ToggleBox>
      <S.ToggleBtn
        on={(toggleUserType === "BUYER").toString()}
        onClick={() => handleToggleBtn("BUYER")}
      >
        구매회원 {pathname.includes("login") ? "로그인" : "회원가입"}
      </S.ToggleBtn>
      <S.ToggleBtn
        on={(toggleUserType === "SELLER").toString()}
        onClick={() => handleToggleBtn("SELLER")}
      >
        판매회원 {pathname.includes("login") ? "로그인" : "회원가입"}
      </S.ToggleBtn>
    </S.ToggleBox>
  );
}

export default ToggleBtn;
