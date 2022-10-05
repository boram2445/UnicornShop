import React from "react";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./inputFormStyle";
import checkOnIcon from "../../../assets/icons/icon-check-on.svg";
import checkOffIcon from "../../../assets/icons/icon-check-off.svg";

type InputProps = {
  type: string;
  name: string;
  label: string;
  icon?: string;
  width?: string;
};

function InputForm({ type, name, label, icon, width }: InputProps) {
  let iconType;
  if (icon === "on") {
    iconType = checkOnIcon;
  } else if (icon === "off") {
    iconType = checkOffIcon;
  }
  return (
    <div>
      <S.LabelText>{label}</S.LabelText>
      <S.Input type={type} name={name} width={width || "100%"} icon={iconType} />
      {name === "id" && (
        <NormalBtn size="smedium" width="122px">
          중복확인
        </NormalBtn>
      )}
    </div>
  );
}

function InputPhone() {
  return (
    <div>
      <S.LabelText>휴대폰번호</S.LabelText>
      <S.InputPhone type="text" name="phone" width="150px" />
      <S.InputPhone type="text" name="phone" width="150px" />
      <S.InputPhone type="text" name="phone" width="150px" />
    </div>
  );
}

function InputEmail() {
  return (
    <S.InputEmailBox>
      <S.LabelText>이메일</S.LabelText>
      <S.Input type="text" name="email" width="218px" />
      <span>@</span>
      <S.Input type="text" name="email" width="218px" />
    </S.InputEmailBox>
  );
}

export { InputForm, InputPhone, InputEmail };
