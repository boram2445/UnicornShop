import React from "react";
import { InputEmail, InputForm, InputPhone } from "../InputForm/InputForm";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import * as S from "./joinFormStyle";

function JoinForm() {
  return (
    <S.JoinFormSection>
      <ToggleBtn />
      <S.JoinForm>
        <InputForm type="text" name="id" label="아이디" width="346px" />
        <InputForm type="password" name="password" label="비밀번호" icon="off" />
        <InputForm type="password" name="confirmPassword" label="비밀번호" icon="off" />
        <InputForm type="text" name="name" label="이름" />
        <InputPhone />
        <InputEmail />
      </S.JoinForm>
    </S.JoinFormSection>
  );
}

export default JoinForm;
