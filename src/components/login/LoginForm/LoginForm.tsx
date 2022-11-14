import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPostLogin,
  getLoginMessage,
  getLoginStatus,
  reset,
} from "../../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import * as S from "./loginFormStyle";

function LoginForm() {
  const initialValues = {
    username: "",
    password: "",
  };

  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState("");
  const loginStatus = useAppSelector(getLoginStatus);
  const loginMessage = useAppSelector(getLoginMessage);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === "failed") {
      setError(loginMessage);
    }
    if (loginStatus === "succeeded") {
      console.log("로그인 되었습니다.");
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [loginStatus]);

  //버튼 활성화
  const canJoin = Object.values(formValues).every(Boolean);

  //아이디 & 비밀번호 입력
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //로그인 폼 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formValues;
    const userData = {
      username,
      password,
      login_type: "BUYER",
    };
    dispatch(fetchPostLogin(userData));
  };

  return (
    <S.LoginSection>
      <ToggleBtn />
      <S.LoginForm onSubmit={handleSubmit}>
        <S.LoginInput
          type="text"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={formValues.username}
        />
        <S.LoginInput
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={formValues.password}
        />
        {error && <S.ErrorText>아이디 또는 비밀번호가 일치하지 않습니다.</S.ErrorText>}
        <NormalBtn type="submit" disabled={!canJoin}>
          로그인
        </NormalBtn>
      </S.LoginForm>
    </S.LoginSection>
  );
}

export default LoginForm;
