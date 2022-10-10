import React, { useRef, useState } from "react";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./inputFormStyle";
import checkOnIcon from "../../../assets/icons/icon-check-on.svg";
import checkOffIcon from "../../../assets/icons/icon-check-off.svg";
import DropDown from "../../common/SelectInput/SelectInput";

type InputProps = {
  label: string;
  type: string;
  name: string;
  pattern: string;
  maxlength?: string;
  required?: boolean;
  icon?: boolean;
  width?: string;
  onClick?: (username: string) => void;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

//일반, 버튼, 아이콘 입력 폼
function InputForm({ icon, width, onClick, error, onChange, ...props }: InputProps) {
  const [onButton, setOnButton] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  //중복 확인 버튼
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClick?.(inputRef.current.value);
  };

  //input 요소 onChange 이벤트 핸들링
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //아이디 - 중복 확인 버튼 활성화
    if (props.name === "username") {
      if (e.target.value.match(props.pattern)) {
        setOnButton(true);
      } else {
        setOnButton(false);
      }
    }
    //input value 반영
    onChange(e);
  };

  return (
    <div>
      <S.LabelText>{props.label}</S.LabelText>
      <S.Input
        {...props}
        width={width || "100%"}
        onIcon={icon && checkOnIcon}
        offIcon={icon && checkOffIcon}
        onChange={handleOnchange}
        ref={inputRef}
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
  return (
    <S.InputPhoneBox>
      <S.LabelText>휴대폰번호</S.LabelText>
      <div>
        <DropDown />
        <S.InputPhone type="text" name="phone" width="150px" />
        <S.InputPhone type="text" name="phone" width="150px" />
      </div>
    </S.InputPhoneBox>
  );
}

//이메일 입력 폼
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
