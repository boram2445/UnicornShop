import React, { useRef, useEffect } from "react";
import { NormalBtn } from "../../common/Button/Button";
import SelectInput from "../../common/SelectInput/SelectInput";
import * as S from "./joinInputStyle";

interface InputProps {
  label: string;
  type: string;
  name: string;
  icon?: string;
  width?: string;
  value?: string;
  onClick?: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onButton?: boolean;
}

//일반, 버튼, 아이콘 입력 폼
function InputBox({ onClick, onChange, onButton, error, value, ...props }: InputProps) {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  //페이지 렌더링시 아이디 input에 focus
  useEffect(() => {
    if (props.name === "username") {
      inputRef.current.focus();
    }
  }, []);

  //입력 버튼 클릭 이벤트 함수
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClick?.(inputRef.current.value);
  };

  return (
    <S.InputBox>
      <S.LabelText htmlFor={props.name}>{props.label}</S.LabelText>
      <S.Input
        {...props}
        id={props.name}
        ref={inputRef}
        onChange={onChange}
        value={value}
        autoComplete="off"
        required
      />
      {onButton?.toString() && (
        <NormalBtn onClick={handleBtnClick} disabled={!onButton} width="122px" padding="16px 0">
          {props.name === "username" ? "중복확인" : "인증"}
        </NormalBtn>
      )}
      {value && error ? <S.ErrorText>{error}</S.ErrorText> : null}
    </S.InputBox>
  );
}

//휴대폰 번호 입력 폼
interface InputPhoneProps {
  onClick: (selected: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value1: string;
  value2: string;
  value3: string;
  error: string;
}

function InputPhone({ onClick, onChange, value1, value2, value3, error }: InputPhoneProps) {
  const selectItems = ["010", "011", "016", "017", "018", "019"];

  return (
    <S.InputPhoneBox>
      <S.LabelText htmlFor="phone">휴대폰번호</S.LabelText>
      <div>
        <SelectInput
          selectItems={selectItems}
          onClick={onClick}
          checkItem={value1}
          width="150px"
          radius="5px"
          padding="16px 14px 16px 0"
        />
        <S.InputPhone
          id="phone"
          name="phone2"
          type="text"
          width="150px"
          onChange={onChange}
          value={value2}
          autoComplete="off"
          required
        />
        <S.InputPhone
          name="phone3"
          type="text"
          width="150px"
          onChange={onChange}
          value={value3}
          autoComplete="off"
          required
        />
      </div>
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.InputPhoneBox>
  );
}

//이메일 입력 폼
interface InputEmailProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value1: string;
  value2: string;
  error: string;
}

function InputEmail({ onChange, value1, value2, error }: InputEmailProps) {
  return (
    <S.InputEmailBox>
      <S.LabelText htmlFor="email">이메일</S.LabelText>
      <S.Input
        id="email"
        type="text"
        name="email1"
        width="218px"
        onChange={onChange}
        value={value1}
        autoComplete="off"
        required
      />
      <span>@</span>
      <S.Input
        type="text"
        name="email2"
        width="218px"
        onChange={onChange}
        value={value2}
        autoComplete="off"
        required
      />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.InputEmailBox>
  );
}

export { InputBox, InputPhone, InputEmail };
