import React from "react";
import spinnerImg from "../../../assets/spinner.gif";
import * as S from "./spinnerStyle";

function Spinner() {
  return (
    <S.Background>
      <img src={spinnerImg} alt="로딩중" width="8%" />
    </S.Background>
  );
}

export default Spinner;
