import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  fetchPostRegister,
  fetchPostUserName,
  getRegisterStatus,
  getUserNameMessage,
  getUserNameStatus,
  reset,
} from "../../../features/authSlice";
import { InputBox, InputEmail, InputPhone } from "../InputBox/InputBox";
import { NormalBtn } from "../../common/Button/Button";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import CheckLabel from "../../common/CheckLabel/CheckLabel";
import checkOnIcon from "../../../assets/icons/icon-check-on.svg";
import checkOffIcon from "../../../assets/icons/icon-check-off.svg";
import * as S from "./joinFormStyle";
import { useNavigate } from "react-router-dom";

function JoinForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nameStatus = useAppSelector(getUserNameStatus);
  const usernameMessage = useAppSelector(getUserNameMessage);
  const registerStatus = useAppSelector(getRegisterStatus);

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

  //아이디, 비밀번호, 이름, 전화번호, 이메일
  const [formValues, setFormValues] = useState(initialValues);
  //오류 메세지 상태
  const [errorMessage, setErrorMessage] = useState(initialError);
  //아이디 중복 확인 버튼 상태
  const [onNameVaildBtn, setNameVaildBtn] = useState(false);

  useEffect(() => {
    //처음 한번 클릭되었을때 변하고 변경되면
    if (nameStatus !== "idle") {
      setErrorMessage({ ...errorMessage, ["username"]: usernameMessage });
    }
    //가입 하기 버튼 클릭시
    if (registerStatus === "succeeded") {
      console.log("가입 성공");
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [nameStatus, registerStatus]);

  //가입하기 버튼 활성화 체크 - 개선 필요
  const canJoin =
    Object.values(formValues).every(Boolean) &&
    errorMessage.username.includes("사용 가능") &&
    formValues.checkBox === "true" &&
    Object.entries(errorMessage)
      .filter((item) => item[0] !== "username")
      .every((item) => item[1] === "");

  //아이디 중복 확인 버튼 클릭 이벤트
  const checkUserNameVaild = (username: string) => {
    dispatch(reset());
    dispatch(fetchPostUserName(username));
  };

  //글자수 제한
  const handleInputLength = (value: string, maxLen: number) => {
    if (value.length > maxLen) {
      value = value.substring(0, maxLen);
    }
    return value;
  };

  //아이디
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = handleInputLength(value, 20);
    setFormValues({ ...formValues, [name]: newValue });
    const pattern = "^[A-Za-z0-9]{3,21}$";
    //아이디 패턴 검사 통과하면, 중복 확인 버튼 활성화
    if (value.match(pattern)) {
      setErrorMessage({ ...errorMessage, [name]: "" });
      setNameVaildBtn(true);
    } else {
      const message = "아이디는 3-20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
      setErrorMessage({ ...errorMessage, [name]: message });
      setNameVaildBtn(false);
    }
  };

  //비밀번호
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = handleInputLength(value, 20);
    setFormValues({ ...formValues, [name]: newValue });
    const pattern = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$";
    let passwordMessage = "";
    let comfirmMessage = "";
    if (!value.match(pattern)) {
      passwordMessage = "비밀번호는 영문, 숫자 조합 8-20자리를 입력해주세요.";
    }
    //비밀번호 재확인 칸에 값이 있을 경우 검사
    if (formValues.confirmPassword && value !== formValues.confirmPassword) {
      comfirmMessage = "비밀번호가 일치하지 않습니다.";
    }
    setErrorMessage({
      ...errorMessage,
      ["password"]: passwordMessage,
      ["confirmPassword"]: comfirmMessage,
    });
  };

  //비밀번호 재확인
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = handleInputLength(value, 20);
    setFormValues({ ...formValues, [name]: newValue });
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
    const newValue = handleInputLength(value, 10);
    setFormValues({ ...formValues, [name]: newValue });
    const pattern = "^[ㄱ-ㅎ가-힣a-zA-Z]{1,10}$";
    if (value.match(pattern)) {
      setErrorMessage({ ...errorMessage, [name]: "" });
    } else {
      const message = "이름은 한글 혹은 영어로 10자리까지 가능합니다.";
      setErrorMessage({ ...errorMessage, [name]: message });
    }
  };

  //휴대폰 번호
  const onClickPhone = (selected: string) => {
    setFormValues({ ...formValues, ["phone1"]: selected });
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //숫자만 입력 가능
    const newValue = handleInputLength(value, 4).replace(/[^0-9]/g, "");
    setFormValues({ ...formValues, [name]: newValue });

    let message = "";
    if (formValues.phone2 && formValues.phone3) {
      if (
        (name === "phone2" && !newValue.match("^[0-9]{3,4}$")) ||
        (name === "phone3" && !newValue.match("^[0-9]{4}$"))
      ) {
        message = "휴대폰번호 입력 형식을 확인해 주세요";
      }
    }
    setErrorMessage({ ...errorMessage, ["phone"]: message });
  };

  //이메일
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const pattern1 = "^[a-zA-Z0-9]*$";
    const pattern2 = "[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
    let message = "";
    if (formValues.email1 && formValues.email2) {
      if (
        (name === "email1" && !value.match(pattern1)) ||
        (name === "email2" && !value.match(pattern2))
      ) {
        message = "이메일 형식을 확인해 주세요";
      }
    }
    setFormValues({ ...formValues, [name]: value });
    setErrorMessage({ ...errorMessage, ["email"]: message });
  };

  //체크박스
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked.toString();
    setFormValues({ ...formValues, ["checkBox"]: value });
  };

  //회원가입 폼 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, confirmPassword, name, phone1, phone2, phone3 } = formValues;
    const userData = {
      username,
      password,
      password2: confirmPassword,
      phone_number: `${phone1}${phone2}${phone3}`,
      name,
    };
    console.log(userData);
    dispatch(fetchPostRegister(userData));
  };

  return (
    <S.JoinFormSection>
      <ToggleBtn />
      <S.JoinForm onSubmit={handleSubmit}>
        <S.InputBoxs>
          <InputBox
            label="아이디"
            type="text"
            name="username"
            width="346px"
            onChange={onChangeUsername}
            onClick={checkUserNameVaild}
            onButton={onNameVaildBtn}
            error={errorMessage.username}
            value={formValues.username}
          />
          <InputBox
            label="비밀번호"
            type="password"
            name="password"
            icon={
              formValues.password.length > 0 && !errorMessage.password ? checkOnIcon : checkOffIcon
            }
            onChange={onChangePassword}
            error={errorMessage.password}
            value={formValues.password}
          />
          <InputBox
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
            value={formValues.confirmPassword}
          />
          <InputBox
            label="이름"
            type="text"
            name="name"
            onChange={onChangeName}
            error={errorMessage.name}
            value={formValues.name}
          />
          <InputPhone
            onClick={onClickPhone}
            onChange={onChangePhone}
            value2={formValues.phone2}
            value3={formValues.phone3}
            error={errorMessage.phone}
          />
          <InputEmail
            onChange={onChangeEmail}
            value1={formValues.email1}
            value2={formValues.email2}
            error={errorMessage.email}
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
