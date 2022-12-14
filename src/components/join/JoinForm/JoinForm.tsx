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

  //?????????, ????????????, ??????, ????????????, ?????????
  const [formValues, setFormValues] = useState(initialValues);
  //?????? ????????? ??????
  const [errorMessage, setErrorMessage] = useState(initialError);
  //????????? ?????? ??????
  const [sellerValues, setSellerValues] = useState(initialSellerValues);

  //????????? ?????? ?????? ??????
  const [onNameVaildBtn, setNameVaildBtn] = useState(false);
  //????????? ???????????? ?????? ??????
  const [onRegistrationBtn, setRegistrationBtn] = useState(false);

  useEffect(() => {
    //?????? ?????? ?????? ????????? ?????? or ?????? ??????
    if (registerStatus === "succeeded") {
      alert("????????? ????????????????????? :)");
      dispatch(resetAll());
      navigate("/login");
    } else if (registerStatus === "failed") {
      alert(registerError);
      formValues.checkBox = false;
    }
  }, [registerStatus]);

  //????????? ?????? ?????? ?????? ?????? ?????????
  const checkUserNameVaild = (username: string) => {
    dispatch(fetchPostUserName(username));
  };

  //?????????
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nameStatus !== "idle") dispatch(resetName());
    else {
      const { name, value } = e.target;
      const newValue = limitLength(value, 20);
      const message = "* ???????????? 3-20??? ????????? ?????? ?????????, ?????????, ????????? ???????????????.";
      const error = newValue.match(idRegExp) ? "" : message;
      setFormValues({ ...formValues, [name]: newValue });
      setErrorMessage({ ...errorMessage, [name]: error });
      error ? setNameVaildBtn(false) : setNameVaildBtn(true);
    }
  };

  //????????????
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitLength(value, 20);
    const message = "??????????????? ??????, ?????? ?????? 8-20????????? ??????????????????.";
    const error = newValue.match(passwordRegExp) ? "" : message;
    setFormValues({ ...formValues, [name]: newValue });
    setErrorMessage({ ...errorMessage, [name]: error });

    if (formValues.confirmPassword && value !== formValues.confirmPassword) {
      setErrorMessage({ ...errorMessage, ["confirmPassword"]: "* ??????????????? ???????????? ????????????." });
    }
  };

  //???????????? ?????????
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitLength(value, 20);
    const message =
      value && (value === formValues.password ? "" : "* ??????????????? ???????????? ????????????.");
    setFormValues({ ...formValues, [name]: newValue });
    setErrorMessage({ ...errorMessage, [name]: message });
  };

  //??????
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitLength(value, 10);
    setFormValues({ ...formValues, [name]: newValue });
    const message = "* ????????? ?????? ?????? ????????? 10???????????? ???????????????.";
    const error = newValue.match(nameRegExp) ? "" : message;
    setErrorMessage({ ...errorMessage, [name]: error });
  };

  //????????? ??????
  const onClickPhone = (selected: string) => {
    setFormValues({ ...formValues, ["phone1"]: selected });
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //?????? 4????????? ?????? ??????
    const newValue = limitLength(value, 4).replace(/[^0-9]/g, "");
    const message = "* ??????????????? ?????? ????????? ??????????????????";
    const regExp = name === "phone2" ? phone2RegExp : phone3RegExp;
    const error = newValue.match(regExp) ? "" : message;
    setFormValues({ ...formValues, [name]: newValue });
    setErrorMessage({ ...errorMessage, ["phone"]: error });
  };

  //????????? - ?????? ??????
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const message = "* ????????? ????????? ????????? ?????????";
    setFormValues({ ...formValues, [name]: value });
    const regExp = name === "email1" ? email1RegExp : email2RegExp;
    const error = value.match(regExp) ? "" : message;
    setErrorMessage({ ...errorMessage, ["email"]: error });
  };

  //????????????
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, ["checkBox"]: e.target.checked });
  };

  //????????? ???????????? ?????? ?????????
  const checkRegistrationNumber = (number: string) => {
    dispatch(fetchPostCompanyNumber(number));
  };

  //????????? ????????????
  const onChangeRegistrationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (companyStatus === "succeeded") dispatch(resetCompany());
    else {
      const { name, value } = e.target;
      const newValue = limitLength(value, 10).replace(/[^0-9]/g, "");
      setSellerValues({ ...sellerValues, [name]: newValue });
      const message = "????????? ?????? ????????? ?????? 10?????? ??????????????? ?????????.";
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

  //????????? ??????
  const onChangeStoreName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerValues({ ...sellerValues, ["storeName"]: e.target.value });
  };

  //???????????? ??? ??????
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameStatus !== "succeeded") {
      alert("????????? ????????? ????????? ?????????.");
      return;
    }
    if (userType === "SELLER" && companyStatus !== "succeeded") {
      alert("????????? ?????? ?????? ????????? ????????? ?????????.");
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

  //???????????? ?????? ????????? ?????? ?????? ????????????
  if (registerStatus === "loading") {
    return <Spinner />;
  }

  return (
    <S.JoinFormSection>
      <ToggleBtn />
      <S.JoinForm onSubmit={onSubmit}>
        <S.InputBoxs>
          <InputBox
            label="?????????"
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
            label="????????????"
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
            label="???????????? ?????????"
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
            label="??????"
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
                label="????????? ????????????"
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
                label="????????? ??????"
                type="text"
                name="storeName"
                onChange={onChangeStoreName}
                value={sellerValues.storeName}
              />
            </>
          ) : null}
        </S.InputBoxs>
        <CheckLabel color="#767676" onChange={onChangeCheckbox}>
          ??????????????? <u>????????????</u> ??? <u>????????????????????????</u>??? ?????? ????????? ??????????????? ???????????????.
        </CheckLabel>
        <NormalBtn type="submit" width="480px" padding="19px 0">
          ????????????
        </NormalBtn>
      </S.JoinForm>
    </S.JoinFormSection>
  );
}

export default JoinForm;
