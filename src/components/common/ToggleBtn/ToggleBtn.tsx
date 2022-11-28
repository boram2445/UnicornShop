import React, { useState } from "react";
import { getUserType, setUserType } from "../../../features/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import * as S from "./toggleBtnStyle";

function ToggleBtn() {
  const dispatch = useAppDispatch();
  const userType = useAppSelector(getUserType);
  const [toggleState, setToggleState] = useState({
    buyer: userType === "BUYER",
    seller: userType === "SELLER",
  });
  const handleToggleBtn = (type: string) => {
    if (type === "BUYER") {
      setToggleState({ buyer: true, seller: false });
      dispatch(setUserType("BUYER"));
    } else {
      setToggleState({ buyer: false, seller: true });
      dispatch(setUserType("SELLER"));
    }
  };
  return (
    <S.ToggleBox>
      <S.ToggleBtn on={toggleState.buyer.toString()} onClick={() => handleToggleBtn("BUYER")}>
        구매회원 로그인
      </S.ToggleBtn>
      <S.ToggleBtn on={toggleState.seller.toString()} onClick={() => handleToggleBtn("SELLER")}>
        판매회원 로그인
      </S.ToggleBtn>
    </S.ToggleBox>
  );
}

export default ToggleBtn;
