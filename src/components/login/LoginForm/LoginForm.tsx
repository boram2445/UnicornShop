import React from "react";
import { NormalBtn } from "../../common/Button/Button";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import * as S from "./loginFormStyle";

function LoginForm() {
  return (
    <S.LoginSection>
      <ToggleBtn />
      <S.LoginForm>
        <S.LoginInput type="text" placeholder="아이디" />
        <S.LoginInput type="text" placeholder="비밀번호" />
        <S.ErrorText>아이디 또는 비밀번호가 일치하지 않습니다.</S.ErrorText>
        <NormalBtn>로그인</NormalBtn>
      </S.LoginForm>
    </S.LoginSection>
  );
}

export default LoginForm;
