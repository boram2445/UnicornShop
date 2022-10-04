import React, { useState } from "react";
import * as S from "./toggleBtnStyle";

function ToggleBtn() {
  const [toggleState, setToggleState] = useState({
    member: true,
    seller: false,
  });
  const handleToggleBtn = (type: string) => {
    if (type === "member") {
      setToggleState({ member: true, seller: false });
    } else {
      setToggleState({ member: false, seller: true });
    }
  };
  return (
    <S.ToggleBox>
      <S.ToggleBtn on={toggleState.member.toString()} onClick={() => handleToggleBtn("member")}>
        구매회원 로그인
      </S.ToggleBtn>
      <S.ToggleBtn on={toggleState.seller.toString()} onClick={() => handleToggleBtn("seller")}>
        판매회원 로그인
      </S.ToggleBtn>
    </S.ToggleBox>
  );
}

export default ToggleBtn;
