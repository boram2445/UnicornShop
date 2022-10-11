import React, { useRef, useEffect } from "react";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./inputFormStyle";
import checkOnIcon from "../../../assets/icons/icon-check-on.svg";
import checkOffIcon from "../../../assets/icons/icon-check-off.svg";
import SelectInput from "../../common/SelectInput/SelectInput";

type InputProps = {
  label: string;
  type: string;
  name: string;
  icon?: string;
  width?: string;
  value?: string;
  onClick?: (username: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onButton?: boolean;
};

//일반, 버튼, 아이콘 입력 폼
function InputForm({ icon, width, onClick, onChange, onButton, error, ...props }: InputProps) {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  //페이지 렌더링시 아이디 input에 focus
  useEffect(() => {
    if (props.name === "username") {
      inputRef.current.focus();
    }
  }, []);

  //중복 확인 버튼
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClick?.(inputRef.current.value);
  };

  return (
    <div>
      <S.LabelText htmlFor={props.name}>{props.label}</S.LabelText>
      <S.Input
        {...props}
        required
        autoComplete="off"
        ref={inputRef}
        onChange={onChange}
        width={width || "100%"}
        icon={icon}
      />
      {props.name === "username" && (
        <NormalBtn size="smedium" width="122px" onClick={handleBtnClick} disabled={!onButton}>
          중복확인
        </NormalBtn>
      )}
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </div>
  );
}

//휴대폰 번호 입력 폼
function InputPhone() {
  const selectItems = ["010", "011", "016", "017", "018", "019"];
  return (
    <S.InputPhoneBox>
      <S.LabelText>휴대폰번호</S.LabelText>
      <div>
        <SelectInput selectItems={selectItems} />
        <S.InputPhone type="text" name="phone" width="150px" autoComplete="off" required />
        <S.InputPhone type="text" name="phone" width="150px" autoComplete="off" required />
      </div>
    </S.InputPhoneBox>
  );
}

//이메일 입력 폼
function InputEmail() {
  return (
    <S.InputEmailBox>
      <S.LabelText>이메일</S.LabelText>
      <S.Input type="text" name="email" width="218px" autoComplete="off" required />
      <span>@</span>
      <S.Input type="text" name="email" width="218px" autoComplete="off" required />
    </S.InputEmailBox>
  );
}

export { InputForm, InputPhone, InputEmail };
