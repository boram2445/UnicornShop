import React, { useState } from "react";
import { setUserType } from "../../../features/authSlice";
import { useAppDispatch } from "../../../hooks";
import * as S from "./toggleBtnStyle";

function ToggleBtn() {
  const dispatch = useAppDispatch();
  const [toggleState, setToggleState] = useState({
    buyer: true,
    seller: false,
  });
  const handleToggleBtn = (type: string) => {
    if (type === "member") {
      setToggleState({ buyer: true, seller: false });
      dispatch(setUserType("BUYER"));
    } else {
      setToggleState({ buyer: false, seller: true });
      dispatch(setUserType("SELLER"));
    }
  };
  return (
    <S.ToggleBox>
      <S.ToggleBtn on={toggleState.buyer.toString()} onClick={() => handleToggleBtn("member")}>
        구매회원 로그인
      </S.ToggleBtn>
      <S.ToggleBtn on={toggleState.seller.toString()} onClick={() => handleToggleBtn("seller")}>
        판매회원 로그인
      </S.ToggleBtn>
    </S.ToggleBox>
  );
}

export default ToggleBtn;
