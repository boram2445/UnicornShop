import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { InputBox, InputEmail, InputPhone } from "../JoinInput/JoinInput";
import { NormalBtn } from "../../common/Button/Button";
import {
  fetchPostUserName,
  fetchPostCompanyNumber,
  fetchPostRegister,
  getNameStatus,
  getCompanyStatus,
  getRegisterStatus,
  getRegisterError,
  getNameMessage,
  getCompanyMessage,
  getJoinUserType,
  resetAll,
  resetName,
  resetCompany,
  RegisterPostData,
} from "../../../features/registerSlice";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import CheckLabel from "../../common/CheckLabel/CheckLabel";
import checkOnIcon from "../../../assets/icons/icon-check-on.svg";
import checkOffIcon from "../../../assets/icons/icon-check-off.svg";
import Spinner from "../../common/Spinner/Spinner";
import limitLength from "../../../utils/limitLength";
import {
  email1RegExp,
  email2RegExp,
  idRegExp,
  nameRegExp,
  passwordRegExp,
  phone1RegExp,
  phone2RegExp,
  phone3RegExp,
} from "../../../utils/regExp";
import * as S from "./joinFormStyle";

function JoinForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userType = useAppSelector(getJoinUserType);

  const nameStatus = useAppSelector(getNameStatus);
  const companyStatus = useAppSelector(getCompanyStatus);
  const registerStatus = useAppSelector(getRegisterStatus);
  const registerError = useAppSelector(getRegisterError);

  const nameMessage = useAppSelector(getNameMessage);
  const companyMessage = useAppSelector(getCompanyMessage);

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
    checkBox: false,
  };

  const initialError = {
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    email: "",
    registrationNumber: "",
  };

  const initialSellerValues = {
    registrationNumber: "",
    storeName: "",
  };

  //아이디, 비밀번호, 이름, 전화번호, 이메일
  const [formValues, setFormValues] = useState(initialValues);
  //오류 메세지 상태
  const [errorMessage, setErrorMessage] = useState(initialError);
  //판매자 추가 정보
  const [sellerValues, setSellerValues] = useState(initialSellerValues);

  //아이디 중복 확인 버튼
  const [onNameVaildBtn, setNameVaildBtn] = useState(false);
  //사업자 등록번호 인증 버튼
  const [onRegistrationBtn, setRegistrationBtn] = useState(false);

  useEffect(() => {
    //가입 하기 버튼 클릭후 성공 or 실패 경우
    if (registerStatus === "succeeded") {
      alert("가입이 완료되었습니다 :)");
      dispatch(resetAll());
      navigate("/login");
    } else if (registerStatus === "failed") {
      alert(registerError);
      formValues.checkBox = false;
    }
  }, [registerStatus]);

  //아이디 중복 확인 버튼 클릭 이벤트
  const checkUserNameVaild = (username: string) => {
    dispatch(fetchPostUserName(username));
  };

  //아이디
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nameStatus !== "idle") dispatch(resetName());
    else {
      const { name, value } = e.target;
      const newValue = limitLength(value, 20);
      const message = "* 아이디는 3-20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
      const error = newValue.match(idRegExp) ? "" : message;
      setFormValues({ ...formValues, [name]: newValue });
      setErrorMessage({ ...errorMessage, [name]: error });
      error ? setNameVaildBtn(false) : setNameVaildBtn(true);
    }
  };

  //비밀번호
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitLength(value, 20);
    const message = "비밀번호는 영문, 숫자 조합 8-20자리를 입력해주세요.";
    const error = newValue.match(passwordRegExp) ? "" : message;
    setFormValues({ ...formValues, [name]: newValue });
    setErrorMessage({ ...errorMessage, [name]: error });

    if (formValues.confirmPassword && value !== formValues.confirmPassword) {
      setErrorMessage({ ...errorMessage, ["confirmPassword"]: "* 비밀번호가 일치하지 않습니다." });
    }
  };

  //비밀번호 재확인
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitLength(value, 20);
    const message =
      value && (value === formValues.password ? "" : "* 비밀번호가 일치하지 않습니다.");
    setFormValues({ ...formValues, [name]: newValue });
    setErrorMessage({ ...errorMessage, [name]: message });
  };

  //이름
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitLength(value, 10);
    setFormValues({ ...formValues, [name]: newValue });
    const message = "* 이름은 한글 혹은 영어로 10자리까지 가능합니다.";
    const error = newValue.match(nameRegExp) ? "" : message;
    setErrorMessage({ ...errorMessage, [name]: error });
  };

  //휴대폰 번호
  const onClickPhone = (selected: string) => {
    setFormValues({ ...formValues, ["phone1"]: selected });
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //숫자 4자리만 입력 가능
    const newValue = limitLength(value, 4).replace(/[^0-9]/g, "");
    const message = "* 휴대폰번호 입력 형식을 확인해주세요";
    const regExp = name === "phone2" ? phone2RegExp : phone3RegExp;
    const error = newValue.match(regExp) ? "" : message;
    setFormValues({ ...formValues, [name]: newValue });
    setErrorMessage({ ...errorMessage, ["phone"]: error });
  };

  //이메일 - 개선 필요
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const message = "* 이메일 형식을 확인해 주세요";
    setFormValues({ ...formValues, [name]: value });
    const regExp = name === "email1" ? email1RegExp : email2RegExp;
    const error = value.match(regExp) ? "" : message;
    setErrorMessage({ ...errorMessage, ["email"]: error });
  };

  //체크박스
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, ["checkBox"]: e.target.checked });
  };

  //사업자 등록번호 인증 이벤트
  const checkRegistrationNumber = (number: string) => {
    dispatch(fetchPostCompanyNumber(number));
  };

  //사업자 등록번호
  const onChangeRegistrationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (companyStatus === "succeeded") dispatch(resetCompany());
    else {
      const { name, value } = e.target;
      const newValue = limitLength(value, 10).replace(/[^0-9]/g, "");
      setSellerValues({ ...sellerValues, [name]: newValue });
      const message = "사업자 등록 번호는 숫자 10자로 이루어져야 합니다.";
      if (newValue.length > 0 && newValue.length < 10) {
        setErrorMessage({ ...errorMessage, [name]: message });
        setRegistrationBtn(false);
      } else if (newValue.length === 0) {
        setErrorMessage({ ...errorMessage, [name]: "" });
        setRegistrationBtn(false);
      } else {
        setErrorMessage({ ...errorMessage, [name]: "" });
        setRegistrationBtn(true);
      }
    }
  };

  //스토어 이름
  const onChangeStoreName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerValues({ ...sellerValues, ["storeName"]: e.target.value });
  };

  //회원가입 폼 제출
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameStatus !== "succeeded") {
      alert("아이디 인증을 완료해 주세요.");
      return;
    }
    if (userType === "SELLER" && companyStatus !== "succeeded") {
      alert("사업자 등록 번호 인증을 완료해 주세요.");
      return;
    }

    const { username, password, confirmPassword, name, phone1, phone2, phone3 } = formValues;
    let userData: RegisterPostData = {
      username,
      password,
      password2: confirmPassword,
      phone_number: `${phone1}${phone2}${phone3}`,
      name,
    };
    if (userType === "SELLER") {
      userData = {
        company_registration_number: sellerValues.registrationNumber,
        store_name: sellerValues.storeName,
        ...userData,
      };
    }
    console.log(userData);
    dispatch(fetchPostRegister({ userType, userData }));
  };

  //가입하기 버튼 클릭시 로딩 화면 보여주기
  if (registerStatus === "loading") {
    return <Spinner />;
  }

  return (
    <S.JoinFormSection>
      <ToggleBtn />
      <S.JoinForm onSubmit={onSubmit}>
        <S.InputBoxs>
          <InputBox
            label="아이디"
            type="text"
            name="username"
            width="346px"
            onChange={onChangeUsername}
            onClick={checkUserNameVaild}
            onButton={onNameVaildBtn}
            error={nameMessage || errorMessage.username}
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
            value1={formValues.phone1}
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
          {userType === "SELLER" ? (
            <>
              <InputBox
                label="사업자 등록번호"
                type="text"
                name="registrationNumber"
                width="346px"
                onChange={onChangeRegistrationNumber}
                onClick={checkRegistrationNumber}
                onButton={onRegistrationBtn}
                error={companyMessage || errorMessage.registrationNumber}
                value={sellerValues.registrationNumber}
              />
              <InputBox
                label="스토어 이름"
                type="text"
                name="storeName"
                onChange={onChangeStoreName}
                value={sellerValues.storeName}
              />
            </>
          ) : null}
        </S.InputBoxs>
        <CheckLabel color="#767676" onChange={onChangeCheckbox}>
          유니콘샵의 <u>이용약관</u> 및 <u>개인정보처리방침</u>에 대한 내용을 확인하였고 동의합니다.
        </CheckLabel>
        <NormalBtn type="submit" width="480px" padding="19px 0">
          가입하기
        </NormalBtn>
      </S.JoinForm>
    </S.JoinFormSection>
  );
}

export default JoinForm;
