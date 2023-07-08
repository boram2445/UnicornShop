import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPostLogin, getAuthState } from "../../../features/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import ToggleBtn from "../../common/ToggleBtn/ToggleBtn";
import * as S from "./loginFormStyle";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const initialValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [message, setMessage] = useState("");

  const { status, error, userType } = useAppSelector(getAuthState);

  useEffect(() => {
    if (status === "failed") {
      setMessage(error);
      passwordRef.current.value = "";
      passwordRef.current.focus();
    }
    if (status === "succeeded") {
      setFormValues(initialValues);
      navigate("/");
    }
  }, [status]);

  //아이디 & 비밀번호 입력
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //로그인 폼 제출
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) return;
    const { username, password } = formValues;
    const userData = {
      username,
      password,
      login_type: userType,
    };
    dispatch(fetchPostLogin(userData));
  };

  return (
    <S.LoginSection>
      <ToggleBtn />
      <S.LoginForm onSubmit={onSubmit}>
        <S.LoginInput
          type="text"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={formValues.username}
          required
        />
        <S.LoginInput
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={formValues.password}
          required
        />
        {error ? <S.ErrorText>{message}</S.ErrorText> : null}
        <NormalBtn type="submit" padding="19px 0">
          로그인
        </NormalBtn>
      </S.LoginForm>
    </S.LoginSection>
  );
}

export default LoginForm;
