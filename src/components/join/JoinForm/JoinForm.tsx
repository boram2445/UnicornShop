import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { InputEmail, InputForm, InputPhone } from "../InputForm/InputForm";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import CheckLabel from "../../common/CheckLabel/CheckLabel";
import { NormalBtn } from "../../common/Button/Button";
import {
  fetchPostUserName,
  getUserNameError,
  getUserNameStatus,
  resetUsernameStatus,
} from "../../../reducers/joinSlice";
import * as S from "./joinFormStyle";

import checkOnIcon from "../../../assets/icons/icon-check-on.svg";
import checkOffIcon from "../../../assets/icons/icon-check-off.svg";

function JoinForm() {
  const dispatch = useAppDispatch();
  const nameStatus = useAppSelector(getUserNameStatus);
  const nameError = useAppSelector(getUserNameError);

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    email1: "",
    email2: "",
    checkBox: "",
  };
  const initialError = {
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    email: "",
  };
  //아이디, 비밀번호, 이름, 전화번호, 이메일 확인
  const [formValues, setFormValues] = useState(initialValues);
  //오류 메세지 상태 저장
  const [errorMessage, setErrorMessage] = useState(initialError);
  //아이디 중복 확인 버튼
  const [onButton, setOnButton] = useState(false);

  useEffect(() => {
    //처음 한번 클릭되었을때 변하고 변경되면
    if (nameStatus !== "idle") {
      setErrorMessage({ ...errorMessage, ["username"]: nameError });
    }
    return () => {
      dispatch(resetUsernameStatus());
    };
  }, [nameStatus]);

  //가입하기 버튼 활성화
  const canJoin =
    Object.values(formValues).every(Boolean) &&
    errorMessage.username.includes("사용 가능") &&
    formValues.checkBox === "true" &&
    Object.entries(errorMessage)
      .filter((item) => item[0] !== "username")
      .every((item) => item[1] === "");

  //아이디 중복 확인 버튼
  const checkUserNameVaild = (username: string) => {
    dispatch(resetUsernameStatus());
    dispatch(fetchPostUserName(username));
  };

  //글자수 제한
  const handleInputLength = (name: string, value: string, maxLen: number) => {
    if (value.length > maxLen) {
      value = value.substring(0, maxLen);
    }
    return value;
  };

  //아이디
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = handleInputLength(name, value, 20);
    setFormValues({ ...formValues, [name]: newValue });
    const pattern = "^[A-Za-z0-9]{3,21}$";
    //아이디가 유효성 검사에서 통과하면, 중복 확인 버튼 활성화
    if (value.match(pattern)) {
      setErrorMessage({ ...errorMessage, [name]: "" });
      setOnButton(true);
    } else {
      const message = "아이디는 3-20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
      setErrorMessage({ ...errorMessage, [name]: message });
      setOnButton(false);
    }
  };

  //비밀번호
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const pattern = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$";
    if (value.match(pattern)) {
      setErrorMessage({ ...errorMessage, [name]: "" });
    } else {
      const message = "비밀번호는 영문, 숫자 조합 8-20자리를 입력해주세요.";
      setErrorMessage({ ...errorMessage, [name]: message });
    }
  };

  //비밀번호 확인
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (value === formValues.password) {
      setErrorMessage({ ...errorMessage, [name]: "" });
    } else {
      const message = "비밀번호가 일치하지 않습니다.";
      setErrorMessage({ ...errorMessage, [name]: message });
    }
  };

  //이름
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const pattern = "^[가-힣a-zA-Z]+$";
    if (value.match(pattern)) {
      setErrorMessage({ ...errorMessage, [name]: "" });
    } else {
      const message = "이름은 한글 혹은 영어 조합이어야 합니다.";
      setErrorMessage({ ...errorMessage, [name]: message });
    }
  };

  //휴대폰 번호
  const onClickPhone = (selected: string) => {
    setFormValues({ ...formValues, ["phone1"]: selected });
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = handleInputLength(name, value, 4);
    setFormValues({ ...formValues, [name]: newValue });
  };

  //이메일
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //체크박스
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked.toString();
    setFormValues({ ...formValues, ["checkBox"]: value });
  };

  //form 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <S.JoinFormSection>
      <ToggleBtn />
      <S.JoinForm onSubmit={handleSubmit}>
        <S.InputBoxs>
          <InputForm
            label="아이디"
            type="text"
            name="username"
            width="346px"
            onChange={onChangeUsername}
            onClick={checkUserNameVaild}
            onButton={onButton}
            error={errorMessage.username}
            value={formValues.username}
          />
          <InputForm
            label="비밀번호"
            type="password"
            name="password"
            icon={
              formValues.password.length > 0 && !errorMessage.password ? checkOnIcon : checkOffIcon
            }
            onChange={onChangePassword}
            error={errorMessage.password}
          />
          <InputForm
            label="비밀번호 재확인"
            type="password"
            name="confirmPassword"
            icon={
              formValues.confirmPassword.length > 0 && !errorMessage.confirmPassword
                ? checkOnIcon
                : checkOffIcon
            }
            onChange={onChangeConfirmPassword}
            error={errorMessage.confirmPassword}
          />
          <InputForm
            label="이름"
            type="text"
            name="name"
            onChange={onChangeName}
            error={errorMessage.name}
          />
          <InputPhone
            onClick={onClickPhone}
            onChange={onChangePhone}
            value2={formValues.phone2}
            value3={formValues.phone3}
          />
          <InputEmail
            onChange={onChangeEmail}
            value1={formValues.email1}
            value2={formValues.email2}
          />
        </S.InputBoxs>
        <CheckLabel color="#767676" onChange={onChangeCheckbox}>
          유니콘샵의 <u>이용약관</u> 및 <u>개인정보처리방침</u>에 대한 내용을 확인하였고 동의합니다.
        </CheckLabel>
        <NormalBtn type="submit" size="medium" disabled={!canJoin}>
          가입하기
        </NormalBtn>
      </S.JoinForm>
    </S.JoinFormSection>
  );
}

export default JoinForm;
